import { Component } from 'react'
import cn from 'clsx'
import { IGame } from '../../types/game.interface'
import styles from './GameCard.module.scss'
import NoImage from '../../assets/no-image.jpg'

class GameCard extends Component<IGame> {
  bgRating = () => {
    const { rating } = this.props
    if (rating > 4) {
      return styles.good
    } else if (rating > 3) {
      return styles.normal
    } else {
      return styles.bad
    }
  }

  render() {
    const { name, background_image, rating, genres } = this.props
    const genresArr = genres.map(genre => genre.name).join(', ')

    return (
      <div className={styles.card}>
        <div className={styles.img}>
          {background_image ? (
            <img src={background_image} alt="Game image" />
          ) : (
            <img src={NoImage} alt="No image" />
          )}
        </div>
        <h4 className={styles.title}>{name}</h4>
        <div className={cn(styles.rating, this.bgRating())}>
          {rating.toFixed(1)} / 5
        </div>
        <div className={styles.genre}>{genresArr}</div>
      </div>
    )
  }
}

export default GameCard
