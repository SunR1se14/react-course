import { Component } from 'react'
import Search from './components/Search/Search'
import GameList from './components/GameList/GameList'
import { IGame } from './types/game.interface'
import { IResponse } from './types/response,interface'

interface IState {
  searchGames: IGame[]
  isLoadingSearchGames: boolean
}

class App extends Component<IState> {
  state: IState = {
    searchGames: [],
    isLoadingSearchGames: false,
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
    } finally {
      this.setState({ isLoadingSearchGames: false })
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">
          Game <span>Galaxy</span>
        </h1>
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
