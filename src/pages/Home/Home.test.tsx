import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Home from './Home'
import { MemoryRouter } from 'react-router-dom'
import { IGame } from '../../types/game.interface'

vi.mock('../../components/Search/Search', () => ({
  default: ({
    onSearchChange,
  }: {
    onSearchChange: (search: string) => void
  }) => (
    <input
      aria-label="Search input"
      onChange={e => onSearchChange(e.target.value)}
    />
  ),
}))

vi.mock('../../components/GameList/GameList', () => ({
  default: ({ games, isLoading }: { games: IGame[]; isLoading: boolean }) =>
    isLoading ? (
      <div>Loading...</div>
    ) : (
      <div>
        {games.map((game, index) => (
          <div key={index} aria-label={`Game ${game.name}`}>
            {game.name}
          </div>
        ))}
      </div>
    ),
}))

vi.mock('../../components/Pagination/Pagination', () => ({
  default: ({
    currentPage,
    totalPages,
    onPageChange,
  }: {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
  }) => (
    <div>
      <button
        aria-label="Previous page button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          aria-label={`Page ${i + 1} button`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        aria-label="Next page button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  ),
}))

describe('Home', () => {
  const mockGames: IGame[] = [
    {
      id: 1,
      name: 'Grand Theft Auto V',
      slug: 'gta-v',
      background_image: '',
      developers: [{ name: '' }],
      genres: [{ name: '' }],
      platforms: [
        {
          platform: { name: '' },
        },
      ],
      rating: 5,
      released: '',
    },
    {
      id: 2,
      name: 'Portal 2',
      slug: 'portal-2',
      background_image: '',
      developers: [{ name: '' }],
      genres: [{ name: '' }],
      platforms: [
        {
          platform: { name: '' },
        },
      ],
      rating: 5,
      released: '',
    },
  ]

  vi.mock('../../utils/fetchGames', () => ({
    fetchGames: vi.fn().mockResolvedValue(mockGames),
  }))

  it('loads and displays games', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(
        screen.getByLabelText('Game Grand Theft Auto V'),
      ).toBeInTheDocument()
      expect(screen.getByLabelText('Game Portal 2')).toBeInTheDocument()
    })
  })

  it('handles search correctly', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    const searchInput = screen.getByLabelText('Search input')
    fireEvent.change(searchInput, { target: { value: 'gta' } })

    await waitFor(() => {
      expect(
        screen.getByLabelText('Game Grand Theft Auto V'),
      ).toBeInTheDocument()
    })
  })
})
