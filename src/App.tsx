import { Component } from 'react'
import Search from './components/Search/Search'
import GameList from './components/GameList/GameList'
import { IGame } from './types/game.interface'
import { IResponse } from './types/response,interface'
import styles from './App.module.scss'

interface IState {
  searchGames: IGame[]
  isLoadingSearchGames: boolean
  hasError: boolean
}

class App extends Component<Record<string, never>, IState> {
  state: IState = {
    searchGames: [],
    isLoadingSearchGames: false,
    hasError: false,
  }

  search = async (value: string) => {
    try {
      this.setState({ isLoadingSearchGames: true })
      const res = await fetch(
        `https://api.rawg.io/api/games?key=a2a625bfa01a46bbb1a130f28fc8ee34&page_size=9&page=1&search=${value}`,
      )
      const data: IResponse = await res.json()
      this.setState({ searchGames: data.results })
    } catch (error) {
      console.error(error)
      this.setState({ hasError: true })
    } finally {
      this.setState({ isLoadingSearchGames: false })
    }
  }

  simulateError = () => {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      throw new Error('Simulated error!')
    }

    return (
      <div className="container">
        <h1 className="title">
          Game <span>Galaxy</span>
        </h1>
        <button className={styles['error-btn']} onClick={this.simulateError}>
          Simulate Error
        </button>
        <Search search={this.search} />
        <GameList
          searchGames={this.state.searchGames}
          isLoadingSearchGames={this.state.isLoadingSearchGames}
        />
      </div>
    )
  }
}

export default App
