import { Component, ReactNode } from 'react'
import styles from './GameCard.module.scss'

class GameCard extends Component {
  render(): ReactNode {
    return (
      <div className={styles.card}>
        <div className={styles.img}>
          <img
            src="https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg"
            alt="Game image"
          />
        </div>
        <h4 className={styles.title}>Grand Theft Auto V</h4>
        <div className={styles.rating}>4.5 / 5</div>
        <div className={styles.genre}>Action</div>
      </div>
    )
  }
}

export default GameCard
