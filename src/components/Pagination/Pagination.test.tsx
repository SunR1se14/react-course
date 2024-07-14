import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Pagination from './Pagination'
import { MemoryRouter } from 'react-router-dom'

describe('Pagination', () => {
  it('renders page numbers correctly', () => {
    render(
      <MemoryRouter initialEntries={['/details']}>
        <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
      </MemoryRouter>,
    )

    const pageButtons = screen.getAllByRole('button', { name: /[0-9]+/ })
    expect(pageButtons).toHaveLength(5)

    expect(screen.getByText('1')).toHaveClass(
      '_pagination_btn_08165b _active_08165b',
    )
  })

  it('calls onPageChange correctly when clicking page number', async () => {
    const onPageChangeMock = vi.fn()

    render(
      <MemoryRouter initialEntries={['/details']}>
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={onPageChangeMock}
        />
      </MemoryRouter>,
    )

    const pageButton = screen.getByText('2')
    fireEvent.click(pageButton)

    await waitFor(() => {
      expect(onPageChangeMock).toHaveBeenCalledWith(2)
    })
  })

  it('disables previous button on first page and next button on last page', () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={['/details']}>
        <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
      </MemoryRouter>,
    )

    const prevButton = screen.getByTestId('prev')
    const nextButton = screen.getByTestId('next')

    expect(prevButton).toBeDisabled()
    expect(nextButton).not.toBeDisabled()

    rerender(
      <MemoryRouter initialEntries={['/details']}>
        <Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />
      </MemoryRouter>,
    )

    expect(prevButton).not.toBeDisabled()
    expect(nextButton).not.toBeDisabled()

    rerender(
      <MemoryRouter initialEntries={['/details']}>
        <Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />
      </MemoryRouter>,
    )

    expect(prevButton).not.toBeDisabled()
    expect(nextButton).toBeDisabled()
  })

  it('renders arrow icons in navigation buttons', () => {
    render(
      <MemoryRouter initialEntries={['/details']}>
        <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
      </MemoryRouter>,
    )

    const prevButtonIcon = screen.getByTestId('prev').querySelector('img')
    const nextButtonIcon = screen.getByTestId('next').querySelector('img')

    expect(prevButtonIcon).toHaveAttribute('src', '/assets/img/arrow_back.svg')
    expect(nextButtonIcon).toHaveAttribute(
      'src',
      '/assets/img/arrow_forward.svg',
    )
  })

  it('calls onPageChange correctly when clicking navigation buttons', () => {
    const onPageChangeMock = vi.fn()

    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    )

    const prevButton = screen.getByTestId('prev')
    const nextButton = screen.getByTestId('next')

    fireEvent.click(prevButton)
    expect(onPageChangeMock).toHaveBeenCalledWith(2)

    fireEvent.click(nextButton)
    expect(onPageChangeMock).toHaveBeenCalledWith(4)
  })
})
