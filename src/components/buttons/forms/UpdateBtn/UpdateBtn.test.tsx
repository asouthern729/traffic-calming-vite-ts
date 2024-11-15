import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

// Components
import UpdateBtn from './UpdateBtn'

describe('UpdateBtn', () => {
  const handleClickMock = vi.fn()

  it('Renders correctly', () => {
      render(
        <UpdateBtn
          label={'Update Violation'}
          handleClick={handleClickMock}
          disabled={false} />
      )

      const button = screen.getByRole('button')
      const text = screen.getByText('Update Violation')

      expect(button).toBeInTheDocument()
      expect(text).toBeInTheDocument()
  })

  it('Disable prop disables button', () => {
      const { rerender } = render(
        <UpdateBtn
          label={'Update Violation'}
          handleClick={handleClickMock}
          disabled={false} /> // Enabled
      )
  
      let button = screen.getByRole('button')
      fireEvent.click(button)
  
      expect(handleClickMock).toHaveBeenCalled()

      rerender(
        <UpdateBtn
          label={'Update Violation'}
          handleClick={handleClickMock}
          disabled={true} /> // Disabled
      )

      button = screen.getByRole('button')

      expect(button).toBeDisabled()
    })
})