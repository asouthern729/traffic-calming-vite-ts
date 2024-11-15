import { useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

// Types
import { RespondentsContainerState } from '../../../containers/RespondentsContainer/types'

// Components
import NextPageBtn from './NextPageBtn'

describe('NextPageBtn', () => {
  const handleClickMock = vi.fn()

  it('Renders correctly', () => {
      render(
        <NextPageBtn 
          handleClick={handleClickMock}
          disabled={false} />
      )

      const button = screen.getByRole('button')
  
      expect(button).toBeInTheDocument()
  })

  it('Executes handleClick fn on click', () => {
      const { rerender } = render(
        <NextPageBtn 
          handleClick={handleClickMock}
          disabled={false} /> // Active
      )
  
      let button = screen.getByRole('button')
      fireEvent.click(button)
  
      expect(handleClickMock).toHaveBeenCalled()

      rerender(
        <NextPageBtn 
          handleClick={handleClickMock}
          disabled={true} /> // Disabled
      )

      button = screen.getByRole('button')
      fireEvent.click(button)

      expect(handleClickMock).toHaveBeenCalledTimes(1)
    })

  it('Updates state on click', () => {
    const TestComponent = () => {
      const [state, setState] = useState<RespondentsContainerState>({ currentPage: 1, hideResponded: false, showContainer: true })

      return (
        <>
          <div>Current Page = {state.currentPage}</div>
          <NextPageBtn 
            handleClick={() => setState(prevState => ({ ...prevState, currentPage: prevState.currentPage + 1 }))}
            disabled={false} />
        </>
      )
    }

    render(<TestComponent />)

    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(screen.getByText('Current Page = 2')).toBeInTheDocument()
  })
})