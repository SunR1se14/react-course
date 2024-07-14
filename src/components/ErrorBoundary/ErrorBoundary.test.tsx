import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import ErrorBoundary from './ErrorBoundary'
import { render, screen } from '@testing-library/react'

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child component</div>
      </ErrorBoundary>,
    )

    const childElement = screen.getByTestId('child')
    expect(childElement).toBeTruthy()
  })

  it('renders error message and reload button when an error is caught', async () => {
    render(
      <ErrorBoundary>
        <ChildComponentWithError />
      </ErrorBoundary>,
    )

    const errorTitle = screen.getByText(/Something went wrong./i)
    const errorDesc = screen.getByText(/Please try again later./i)
    const returnButton = screen.getByRole('button', { name: /Return/i })

    expect(errorTitle).toBeTruthy()
    expect(errorDesc).toBeTruthy()
    expect(returnButton).toBeTruthy()

    await userEvent.click(returnButton)
  })
})

const ChildComponentWithError = () => {
  throw new Error('Test error')
}
