import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import GameList from './GameList'
import { IGame } from '../../types/game.interface'

describe('GameList', () => {
  it('should display numbers of cards', () => {
    const games: IGame[] = [
      {
        id: 1,
        name: 'Game 1',
        slug: 'game-1',
        background_image: '',
        released: '',
        rating: 0,
        genres: [{ name: 'Action' }],
        developers: [{ name: 'Valve' }],
        platforms: [{ platform: { name: 'Pc' } }],
      },
      {
        id: 2,
        name: 'Game 2',
        slug: 'game-2',
        background_image: '',
        released: '',
        rating: 0,
        genres: [{ name: 'Action' }],
        developers: [{ name: 'Valve' }],
        platforms: [{ platform: { name: 'Pc' } }],
      },
    ]

    render(
      <Router>
        <GameList games={games} isLoading={false} />
      </Router>,
    )

    const gameCards = screen.getAllByRole('link')
    expect(gameCards).toHaveLength(2)
  })

  it('should display a message when there are no cards', () => {
    render(
      <Router>
        <GameList games={[]} isLoading={false} />
      </Router>,
    )

    const notFoundMessage = screen.getByText(/nothing found/i)
    expect(notFoundMessage).toBeInTheDocument()
  })

  it('should display a message "Loading..."', () => {
    render(
      <Router>
        <GameList games={[]} isLoading={true} />
      </Router>,
    )

    const loadingMessage = screen.getByText(/loading.../i)
    expect(loadingMessage).toBeInTheDocument()
  })
})
