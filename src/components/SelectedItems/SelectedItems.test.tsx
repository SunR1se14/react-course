import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SelectedItems from './SelectedItems'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from '../../store/reducers/favorites.slice'
import { ThemeContext } from '../../context/ThemeContextProvider'
import { MemoryRouter } from 'react-router-dom'
import { IGame } from '../../types/game.interface'

const mockFavorites: IGame[] = [
  {
    id: 1,
    name: 'Game 1',
    slug: 'game-1',
    released: '2021-01-01',
    genres: [{ name: 'Genre 1' }],
    background_image: '',
    developers: [{ name: '' }],
    platforms: [
      {
        platform: { name: '' },
      },
    ],
    rating: 5,
  },
  {
    id: 2,
    name: 'Game 2',
    slug: 'game-2',
    released: '2021-02-01',
    genres: [{ name: 'Genre 2' }],
    background_image: '',
    developers: [{ name: '' }],
    platforms: [
      {
        platform: { name: '' },
      },
    ],
    rating: 4,
  },
]

vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}))

vi.mock('papaparse', () => ({
  unparse: vi.fn(() => 'mocked csv data'),
}))

describe('SelectedItems', () => {
  interface Options {
    theme?: string
    store?: ReturnType<typeof configureStore>
  }

  const renderWithProviders = (
    ui: React.ReactElement,
    options: Options = {},
  ) => {
    const { theme = 'light', store } = options

    const configuredStore =
      store ||
      configureStore({
        reducer: {
          favorites: favoritesReducer,
        },
      })

    return render(
      <Provider store={configuredStore}>
        <ThemeContext.Provider value={[theme, vi.fn()]}>
          <MemoryRouter>{ui}</MemoryRouter>
        </ThemeContext.Provider>
      </Provider>,
    )
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders favorite games count', () => {
    const store = configureStore({
      reducer: {
        favorites: favoritesReducer,
      },
      preloadedState: {
        favorites: mockFavorites,
      },
    })

    renderWithProviders(<SelectedItems />, { store })

    expect(screen.getByText('Favorite games')).toBeInTheDocument()
    expect(
      screen.getByText(mockFavorites.length.toString()),
    ).toBeInTheDocument()
  })

  it('unselects all favorite games', () => {
    const store = configureStore({
      reducer: {
        favorites: favoritesReducer,
      },
      preloadedState: {
        favorites: mockFavorites,
      },
    })

    renderWithProviders(<SelectedItems />, { store })

    const unselectButton = screen.getByText('Unselect all')
    fireEvent.click(unselectButton)

    expect(store.getState().favorites).toEqual([])
  })
})
