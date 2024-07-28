import { describe, expect, it, beforeEach, vi, Mock } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import GameList from './GameList'
import { IGame } from '../../types/game.interface'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { favoritesActions } from '../../store/reducers/favorites.slice'

vi.mock('../../hooks/useAppDispatch')
vi.mock('../../hooks/useAppSelector')

vi.mock('../GameCard/GameCard', () => ({
  default: ({ name }: { name: string }) => <div>{name}</div>,
}))

describe('GameList', () => {
  const mockDispatch = vi.fn()
  const mockFavorites: IGame[] = []

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useAppDispatch as unknown as Mock).mockReturnValue(mockDispatch)
    ;(useAppSelector as unknown as Mock).mockReturnValue({
      favorites: mockFavorites,
    })
  })

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

    const gameCards = screen.getAllByText(/Game \d/)
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

  it('should call dispatch when the favorite button is clicked', () => {
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
    ]

    render(
      <Router>
        <GameList games={games} isLoading={false} />
      </Router>,
    )

    const favoriteButton = screen.getByRole('button', { name: /favorite/i })
    fireEvent.click(favoriteButton)

    expect(mockDispatch).toHaveBeenCalledWith(
      favoritesActions.toggleFavorite(games[0]),
    )
  })

  it('should show the favorite icon as active if the game is in favorites', () => {
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
    ]

    ;(useAppSelector as unknown as Mock).mockReturnValue({
      favorites: [games[0]],
    })

    render(
      <Router>
        <GameList games={games} isLoading={false} />
      </Router>,
    )

    const favoriteIcon = screen.getByText('favorite')
    expect(favoriteIcon).toHaveClass('active')
  })
})
