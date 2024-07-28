import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, vi, beforeEach, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import GameDetails from './GameDetails'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { gamesApi } from '../../services/GamesService'

const mockGame = {
  id: 1,
  rating: 4,
  slug: 'slug',
  name: 'Test Game',
  background_image: 'test-image.jpg',
  released: '2021-01-01',
  developers: [{ name: 'Test Developer' }],
  genres: [{ name: 'Test Genre' }],
  platforms: [{ platform: { name: 'Test Platform' } }],
}

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('../../services/GamesService', () => ({
  gamesApi: {
    useGetGameQuery: vi.fn(),
  },
}))

describe('GameDetails', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should render loading indicator while fetching data', async () => {
    ;(gamesApi.useGetGameQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
      isFetching: true,
    })

    render(
      <MemoryRouter initialEntries={['/details/slug']}>
        <Routes>
          <Route path="/details/:slug" element={<GameDetails />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByText(/Loading.../)).toBeInTheDocument()
  })

  it('should render game details correctly after data is loaded', async () => {
    ;(gamesApi.useGetGameQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockGame,
      isFetching: false,
    })

    render(
      <MemoryRouter initialEntries={['/details/slug']}>
        <Routes>
          <Route path="/details/:slug" element={<GameDetails />} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../)).not.toBeInTheDocument()
    })

    const title = screen.getByText(mockGame.name)
    const releasedDate = screen.getByText(new RegExp(mockGame.released))
    const developers = screen.getByText(new RegExp(mockGame.developers[0].name))
    const genres = screen.getByText(new RegExp(mockGame.genres[0].name))
    const platforms = screen.getByText(
      new RegExp(mockGame.platforms[0].platform.name),
    )
    const image: HTMLImageElement = screen.getByAltText('Game image')

    expect(title).toBeInTheDocument()
    expect(releasedDate).toBeInTheDocument()
    expect(developers).toBeInTheDocument()
    expect(genres).toBeInTheDocument()
    expect(platforms).toBeInTheDocument()
    expect(image.src).toContain(mockGame.background_image)
  })

  it('should clicking close button navigates back', async () => {
    ;(gamesApi.useGetGameQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockGame,
      isFetching: false,
    })

    render(
      <MemoryRouter initialEntries={['/details/slug']}>
        <Routes>
          <Route path="/details/:slug" element={<GameDetails />} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../)).not.toBeInTheDocument()
    })

    const closeButton = screen.getByRole('button', { name: /Close/i })
    userEvent.click(closeButton)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(-1)
    })
  })
})
