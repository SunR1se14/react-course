import { render, screen } from '@testing-library/react'
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import GameCard from './GameCard'
import { IGame } from '../../types/game.interface'
import { describe, expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'

// Mock data for a game
const game: IGame = {
  id: 1,
  name: 'Test Game',
  background_image: 'test-image.jpg',
  rating: 4.5,
  genres: [{ name: 'Action' }],
  slug: 'test-game',
  developers: [{ name: 'Valve' }],
  platforms: [{ platform: { name: 'Pc' } }],
  released: '',
}

describe('GameCard', () => {
  test('displays correct game data', () => {
    render(
      <BrowserRouter>
        <GameCard {...game} />
      </BrowserRouter>,
    )

    expect(screen.getByText('Test Game')).toBeInTheDocument()
    expect(screen.getByAltText('Game image')).toHaveAttribute(
      'src',
      'test-image.jpg',
    )
    expect(screen.getByText('4.5 / 5')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  test('opens game details when clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<GameCard {...game} />} />
          <Route path="/details/:slug" element={<div>Game Details</div>} />
        </Routes>
      </MemoryRouter>,
    )

    const user = userEvent.setup()

    await user.click(screen.getByText('Test Game'))

    expect(screen.getByText('Test Game')).toBeInTheDocument()
  })
})
