import { useCallback, useState } from 'react'
import Search from './components/Search/Search'
import GameList from './components/GameList/GameList'
import { IGame } from './types/game.interface'
import { IResponse } from './types/response,interface'

const App = () => {
  const [searchGames, setSearchGames] = useState<IGame[]>([])
  const [isLoadingSearchGames, setIsLoadingSearchGames] =
    useState<boolean>(false)

  const search = useCallback(async (value: string) => {
    try {
      setIsLoadingSearchGames(true)
      const res = await fetch(
        `https://api.rawg.io/api/games?key=a2a625bfa01a46bbb1a130f28fc8ee34&page_size=9&page=1&search=${value}`,
      )
      const data: IResponse = await res.json()
      setSearchGames(data.results)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingSearchGames(false)
    }
  }, [])

  return (
    <div className="container">
      <h1 className="title">
        Game <span>Galaxy</span>
      </h1>
      <Search search={search} />
      <GameList
        searchGames={searchGames}
        isLoadingSearchGames={isLoadingSearchGames}
      />
    </div>
  )
}

export default App
