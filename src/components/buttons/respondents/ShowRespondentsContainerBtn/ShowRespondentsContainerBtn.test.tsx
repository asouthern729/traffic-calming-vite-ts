import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

// Components
import ShowRespondentsContainerBtn from './ShowRespondentsContainerBtn'

describe('ShowRespondentsContainerBtn', () => {
  const handleClickMock = vi.fn()

  it('Renders correctly', () => {
      render(
        <ShowRespondentsContainerBtn
          label={'Show Respondents'}
          handleClick={handleClickMock} />
      )

      const button = screen.getByRole('button')
  
      expect(button).toBeInTheDocument()
      expect(screen.getByText('Show Respondents')).toBeInTheDocument()
  })

  it('Calls handleClick fn on button click', () => {
    render(
      <ShowRespondentsContainerBtn
        label={'Show Respondents'}
        handleClick={handleClickMock} />
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleClickMock).toHaveBeenCalled()
  })
})