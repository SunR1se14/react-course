import cn from 'clsx'
import GameCard from '../GameCard/GameCard'
import { IGame } from '../../types/game.interface'
import styles from './GameList.module.scss'
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { favoritesActions } from '../../store/reducers/favorites.slice'
import { useAppSelector } from '../../hooks/useAppSelector'

interface Props {
  games: IGame[]
  isLoading: boolean
}

const GameList = ({ games, isLoading }: Props) => {
  const dispatch = useAppDispatch()
  const { favorites } = useAppSelector(s => s)

  if (isLoading) {
    return <div className={styles['loading']}>Loading...</div>
  }

  return (
    <>
      {!isLoading && !games.length && (
        <div className={styles['not-found']}>Nothing found</div>
      )}
      <div className={styles['card-list']}>
        {games.map(game => (
          <div
            key={game.id}
            aria-label={`Game ${game.name}`}
            className={styles['game-card-container']}
          >
            <NavLink to={`details/${game.slug}`}>
              <GameCard {...game} />
            </NavLink>
            <button
              className={styles.favorite}
              onClick={() => dispatch(favoritesActions.toggleFavorite(game))}
            >
              <span
                className={cn('material-symbols-outlined', {
                  ['active']: favorites.some(item => item.id === game.id),
                })}
              >
                favorite
              </span>
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default GameList
