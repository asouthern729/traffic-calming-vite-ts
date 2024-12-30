import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { useRedirect } from './hooks'

// Components
import ClosedPetition from './ClosedPetition'

const mockedUseNavigate = vi.fn()

describe('ClosedPetition', () => {
  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')

    return {
      ...actual,
      useNavigate: () => mockedUseNavigate,
    }
  })

  it('Renders correctly', () => {
      render(
        <BrowserRouter>
          <ClosedPetition label={'Petition is closed'} />
        </BrowserRouter>
      )

      const element = screen.getByTestId('closed-petition')
  
      expect(element).toBeInTheDocument()
  })

  it('useRedirect redirect user', () => {
    const TestComponent = () => {
      const { timer } = useRedirect()

      return (
        <div>There is {timer} seconds left</div>
      )
    }

    vi.useFakeTimers()

    render(
      <BrowserRouter>
        <TestComponent />
      </BrowserRouter>
    )

    setTimeout(() => {

    }, 5000)

    vi.waitFor(() => {
      expect(screen.getByText('There is 0 seconds left')).toBeInTheDocument()

      expect(mockedUseNavigate).toHaveBeenCalled()
    }, { timeout: 1000 })
  })
})