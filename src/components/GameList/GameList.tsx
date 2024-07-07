import { Component, ReactNode } from 'react'
import GameCard from '../GameCard/GameCard'
import styles from './GameList.module.scss'

class GameList extends Component {
  render(): ReactNode {
    return (
      <div className={styles['card-list']}>
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
      </div>
    )
  }
}

export default GameList
