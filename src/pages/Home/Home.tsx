import { useEffect, useState } from 'react'
import Search from '../../components/Search/Search'
import GameList from '../../components/GameList/GameList'
import { IGame } from '../../types/game.interface'
import { IResponse } from '../../types/response.interface'
import { API_KEY, API_URL } from '../../utils/constants'
import useLocalStorage from '../../hooks/useLocalStorage'
import styles from './Home.module.scss'
import Pagination from '../../components/Pagination/Pagination'
import { Outlet, useSearchParams } from 'react-router-dom'

const Home = () => {
  const [games, setGames] = useState<IGame[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalPages] = useState<number>(9)
  const [searchValue, setSearchValue] = useLocalStorage<string>(
    'searchValue',
    '',
  )
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1')
  const search = searchParams.get('search') || searchValue

  useEffect(() => {
    const getGames = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(
          `${API_URL}?key=${API_KEY}&page_size=9&page=${page}&search=${searchValue}`,
        )
        const data: IResponse = await res.json()
        setGames(data.results)
        setSearchValue(search)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    ;``
    getGames()
  }, [page, searchValue, setSearchValue, search])

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

  return (
    <div className="container">
      <h1 className="title">
        Game <span>Galaxy</span>
      </h1>
      <Search
        setSearchValue={setSearchValue}
        onSearchChange={handleSearchChange}
      />
      {!isLoading && !games.length && (
        <div className={styles['not-found']}>Nothing found</div>
      )}
      <div className={styles.wrapper}>
        <GameList games={games} isLoading={isLoading} />
        <Outlet />
      </div>
      {!isLoading && games.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default Home
