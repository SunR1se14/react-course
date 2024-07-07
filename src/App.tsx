import { Component, ReactNode } from 'react'
import Search from './components/Search/Search'
import GameList from './components/GameList/GameList'

class App extends Component {
  render(): ReactNode {
    return (
      <div className="container">
        <h1 className="title">
          Game <span>Galaxy</span>
        </h1>
        <Search />
        <GameList />
      </div>
    )
  }
}

export default App
