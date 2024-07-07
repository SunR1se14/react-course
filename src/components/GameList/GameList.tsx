import { Component } from 'react'
import GameCard from '../GameCard/GameCard'
import { IGame } from '../../types/game.interface'
import { IResponse } from '../../types/response,interface'
import styles from './GameList.module.scss'

interface State {
  games: IGame[]
  isLoading: boolean
}

class GameList extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props)
    this.state = {
      games: [],
      isLoading: false,
    }
  }

  async getGamesData() {
    try {
      this.setState({ isLoading: true })
      const res = await fetch(
        'https://api.rawg.io/api/games?key=a2a625bfa01a46bbb1a130f28fc8ee34&page_size=9&page=1',
      )
      const data: IResponse = await res.json()
      this.setState({ games: data.results })
    } catch (error) {
      console.error(error)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  componentDidMount() {
    this.getGamesData()
  }

  render() {
    const { games, isLoading } = this.state

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
}

export default GameList
