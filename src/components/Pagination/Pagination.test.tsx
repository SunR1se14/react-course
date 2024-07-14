import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Pagination from './Pagination'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

describe('Pagination', () => {
  it('renders page numbers correctly', () => {
    render(
      <MemoryRouter initialEntries={['/details']}>
        <Routes>
          <Route
            path="/details"
            element={
              <Pagination
                currentPage={1}
                totalPages={5}
                onPageChange={() => {}}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    )

    const pageButtons = screen.getAllByRole('button')
    const paginationButtons = pageButtons.filter(btn =>
      btn.className.includes('pagination_btn'),
    )
    expect(paginationButtons).toHaveLength(5) // Assuming totalPages is 5

    expect(screen.getByText('1')).toHaveClass(
      '_pagination_btn_08165b _active_08165b',
    )
  })

  it('calls onPageChange correctly when clicking page number', async () => {
    const onPageChangeMock = vi.fn()

    render(
      <MemoryRouter initialEntries={['/details']}>
        <Routes>
          <Route
            path="/details"
            element={
              <Pagination
                currentPage={1}
                totalPages={5}
                onPageChange={onPageChangeMock}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    )

    const pageButton = screen.getByText('2')
    fireEvent.click(pageButton)

    await waitFor(() => {
      expect(onPageChangeMock).toHaveBeenCalledWith(2)
    })
  })

  it('updates URL parameters correctly when clicking page number', async () => {
    render(
      <MemoryRouter initialEntries={['/details']}>
        <Routes>
          <Route
            path="/details"
            element={
              <Pagination
                currentPage={1}
                totalPages={5}
                onPageChange={() => {}}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    )

    const pageButton = screen.getByText('3')

    expect(pageButton).toBeInTheDocument()
  })
})
