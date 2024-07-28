import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NotFound from './NotFound'
import { MemoryRouter } from 'react-router-dom'

describe('NotFound component', () => {
  it('renders not found image with alt text', () => {
    render(<NotFound />, { wrapper: MemoryRouter })

    const notFoundImage = screen.getByAltText('Not Found image')
    expect(notFoundImage).toBeInTheDocument()
  })

  it('renders correct error message', () => {
    render(<NotFound />, { wrapper: MemoryRouter })

    const titleElement = screen.getByText(/Oops! Page not found/i)
    const textElement = screen.getByText(
      /The page you are looking for might have been removed or temporarily unavailable./i,
    )

    expect(titleElement).toBeInTheDocument()
    expect(textElement).toBeInTheDocument()
  })

  it('renders link to home page with correct route', () => {
    render(<NotFound />, { wrapper: MemoryRouter })

    const linkElement = screen.getByRole('link', { name: /Back to Home Page/i })
    expect(linkElement).toHaveAttribute('href', '/')
  })
})
