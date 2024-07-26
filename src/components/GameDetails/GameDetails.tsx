import { useNavigate, useParams } from 'react-router-dom'
import styles from './GameDetails.module.scss'
import { useEffect, useRef } from 'react'
import NoImage from '../../assets/no-image.jpg'
import { gamesApi } from '../../services/GamesService'

const GameDetails = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const outletRef = useRef<HTMLDivElement>(null)

  const { data: game, isFetching } = gamesApi.useGetGameQuery({
    slug: slug || '',
    pageSize: 1,
  })

  const genresArr = game && game.genres.map(genre => genre.name).join(', ')
  const developersArr =
    game && game.developers.map(developer => developer.name).join(', ')
  const platformsArr =
    game && game.platforms.map(platform => platform.platform.name).join(', ')

  // useEffect(() => {
  //   const getGame = async () => {
  //     try {
  //       setIsLoading(true)
  //       const res = await fetch(`${API_URL}/${slug}?key=${API_KEY}&page_size=9`)
  //       const gameItem: IGame = await res.json()
  //       setGame(gameItem)
  //     } catch (err) {
  //       console.log(err)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   getGame()
  // }, [slug])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        outletRef.current &&
        !outletRef.current.contains(event.target as Node)
      ) {
        navigate(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navigate])

  if (isFetching) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles['details-wrapper']} ref={outletRef}>
      <div className={styles.header}>
        <h2 className={styles['title']}>{game?.name}</h2>
        <button className={styles.close} onClick={() => navigate(-1)}>
          <img src="/assets/img/close.svg" alt="Close icon" />
        </button>
      </div>
      <div className={styles['details-card']}>
        <div className={styles['details-card__img']}>
          {game?.background_image ? (
            <img src={game?.background_image} alt="Game image" />
          ) : (
            <img src={NoImage} alt="No image" />
          )}
        </div>
        <div className={styles['info-wrapper']}>
          <div className={styles.info}>
            <span>Released</span>: {game?.released}
          </div>
          <div className={styles.info}>
            <span>Developers</span>: {developersArr}
          </div>
          <div className={styles.info}>
            <span>Genres</span>: {genresArr}
          </div>
          <div className={styles.info}>
            <span>Platforms</span>: {platformsArr}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameDetails
