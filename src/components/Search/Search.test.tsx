import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import Search from './Search'

describe('Search component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('saves input value to local storage on search button click', () => {
    render(<Search setSearchValue={() => {}} onSearchChange={() => {}} />)

    const searchInput = screen.getByPlaceholderText('Enter game name')
    const searchButton = screen.getByText('Search')

    fireEvent.change(searchInput, { target: { value: 'Final Fantasy' } })
    fireEvent.click(searchButton)

    expect(localStorage.getItem('searchValue')).toBe('"Final Fantasy"')
  })

  it('loads saved value from local storage on component mount', () => {
    localStorage.setItem('searchValue', JSON.stringify('Zelda'))

    render(<Search setSearchValue={() => {}} onSearchChange={() => {}} />)

    const searchInput = screen.getByPlaceholderText('Enter game name')

    expect(searchInput).toHaveValue('Zelda')
  })
})
