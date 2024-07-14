import GameCard from '../GameCard/GameCard'
import { IGame } from '../../types/game.interface'
import styles from './GameList.module.scss'
import { NavLink } from 'react-router-dom'

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
        <NavLink key={game.id} to={`details/${game.slug}`}>
          <GameCard {...game} />
        </NavLink>
      ))}
    </div>
  )
}

export default GameList
