import GameCard from '../GameCard/GameCard'
import { IGame } from '../../types/game.interface'
import styles from './GameList.module.scss'

interface Props {
  games: IGame[]
  isLoading: boolean
}

const GameList = ({ games, isLoading }: Props) => {
  if (isLoading) {
    return <div className={styles['loading']}>Loading...</div>
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
