import { useEffect, useState } from 'react'
import GameCard from '../GameCard/GameCard'
import { IGame } from '../../types/game.interface'
import { IResponse } from '../../types/response,interface'
import styles from './GameList.module.scss'

interface Props {
  searchGames: IGame[]
  isLoadingSearchGames: boolean
}

const GameList = ({ searchGames, isLoadingSearchGames }: Props) => {
  const [games, setGames] = useState<IGame[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getGamesData = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(
        'https://api.rawg.io/api/games?key=a2a625bfa01a46bbb1a130f28fc8ee34&page_size=9&page=1',
      )
      const data: IResponse = await res.json()
      setGames(data.results)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getGamesData()
  }, [])

  if (isLoading || isLoadingSearchGames) {
    return <div className={styles['loading']}>Loading...</div>
  }

  if (searchGames.length) {
    return (
      <div className={styles['card-list']}>
        {searchGames.map(game => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
    )
  }

  return (
    <div className={styles['card-list']}>
      {games.map(game => (
        <GameCard key={game.id} {...game} />
      ))}
    </div>
  )
}

export default GameList
