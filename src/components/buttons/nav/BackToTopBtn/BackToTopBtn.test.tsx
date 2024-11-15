import { useRef } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import * as BackToTopBtnFns from '.'

// Components
import BackToTopBtn from './BackToTopBtn'

describe('BackToTopBtn', () => {

  it('Renders correctly', () => {
    const TestComponent = () => {
      const topRef = useRef<HTMLDivElement>(null)

      return (
        <BrowserRouter>
          <BackToTopBtn topRef={topRef} />
        </BrowserRouter>
      )
    }

    render(<TestComponent />)
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })

  it('Calls handleClick fn on button click', () => {
    const handleClickSpy = vi.spyOn(BackToTopBtnFns, 'handleClick')

    const TestComponent = () => {
      const topRef = useRef<HTMLDivElement>(null)

      return (
        <BrowserRouter>
          <BackToTopBtn topRef={topRef} />
        </BrowserRouter>
      )
    }

    render(<TestComponent />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleClickSpy).toHaveBeenCalled()
  })
})
