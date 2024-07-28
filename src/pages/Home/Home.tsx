import cn from 'clsx'
import { useContext, useState } from 'react'
import Search from '../../components/Search/Search'
import GameList from '../../components/GameList/GameList'
import useLocalStorage from '../../hooks/useLocalStorage'
import styles from './Home.module.scss'
import Pagination from '../../components/Pagination/Pagination'
import { Outlet, useSearchParams } from 'react-router-dom'
import SelectedItems from '../../components/SelectedItems/SelectedItems'
import { useAppSelector } from '../../hooks/useAppSelector'
import Header from '../../components/Header/Header'
import { gamesApi } from '../../services/GamesService'
import { ThemeContext } from '../../context/ThemeContextProvider'

const Home = () => {
  const [totalPages] = useState<number>(9)
  const [searchValue, setSearchValue] = useLocalStorage<string>(
    'searchValue',
    '',
  )
  const { favorites } = useAppSelector(s => s)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1')
  const search = searchParams.get('search') || searchValue

  const { data, isFetching } = gamesApi.useGetGamesQuery({
    pageSize: 9,
    page,
    search,
  })

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    if (params.has('search') && !params.get('search')) {
      params.delete('search')
    }
    setSearchParams(params)
  }

  const handleSearchChange = (search: string) => {
    const params = new URLSearchParams()
    if (search) {
      params.set('search', search)
    }
    params.set('page', '1')
    setSearchParams(params)
  }

  const games = data?.results

  const themeContext = useContext(ThemeContext)

  if (!themeContext) return

  const [theme] = themeContext

  return (
    <div
      className={cn('app', {
        ['light']: theme === 'light',
      })}
    >
      <div className="container">
        <Header />
        <Search
          setSearchValue={setSearchValue}
          onSearchChange={handleSearchChange}
        />
        <div className={styles.wrapper}>
          {games && <GameList games={games} isLoading={isFetching} />}
          <Outlet />
        </div>
        {!isFetching && games && games.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      {favorites.length > 0 && <SelectedItems />}
    </div>
  )
}

export default Home
