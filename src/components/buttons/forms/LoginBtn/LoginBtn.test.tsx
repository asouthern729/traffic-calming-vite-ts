import { render, screen } from '@testing-library/react'

// Components
import LoginBtn from './LoginBtn'

describe('LoginBtn', () => {

  it('Renders correctly', () => {
      render(<LoginBtn disabled={false} />)
  
      const button = screen.getByRole('button')

      expect(button).toBeInTheDocument()
  })

  it('Disable prop disables button', () => {
    const { rerender } = render(<LoginBtn disabled={false} />)

    let button = screen.getByRole('button')
    expect(button).not.toBeDisabled()

    rerender(<LoginBtn disabled={true} />)

    button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })
})