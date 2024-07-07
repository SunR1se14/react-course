import { Component } from 'react'
import GameCard from '../GameCard/GameCard'
import styles from './GameList.module.scss'
import { IGame } from '../../types/game.interface'
import { IResponse } from '../../types/response,interface'

interface State {
  games: IGame[]
}

class GameList extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props)
    this.state = {
      games: [],
    }
  }

  async getGamesData() {
    const res = await fetch(
      'https://api.rawg.io/api/games?key=a2a625bfa01a46bbb1a130f28fc8ee34&page_size=9&page=1',
    )
    const data: IResponse = await res.json()
    this.setState({ games: data.results })
  }

  componentDidMount() {
    this.getGamesData()
  }

  render() {
    const { games } = this.state

    return (
      <div className={styles['card-list']}>
        {games.map(game => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
    )
  }
}

export default GameList
