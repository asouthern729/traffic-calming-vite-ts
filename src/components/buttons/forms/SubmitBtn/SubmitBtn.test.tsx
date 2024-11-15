import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

// Components
import SubmitBtn from './SubmitBtn'

describe('SubmitBtn', () => {
  const handleClickMock = vi.fn()
  
  it('Renders correctly', () => {
      render(
        <SubmitBtn 
          handleClick={handleClickMock}
          disabled={false} />
      )

      const button = screen.getByRole('button')
  
      expect(button).toBeInTheDocument()
  })

  it('Disable prop disables button', () => {
    const { rerender } = render(
      <SubmitBtn 
        handleClick={handleClickMock}
        disabled={false} />
    )

    let button = screen.getByRole('button')
    
    fireEvent.click(button)
    expect(handleClickMock).toHaveBeenCalled()

    rerender(
      <SubmitBtn 
        handleClick={handleClickMock}
        disabled={true} />
    )
    
    button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })
})
