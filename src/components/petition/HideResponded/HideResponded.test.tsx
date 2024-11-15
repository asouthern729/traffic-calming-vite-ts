import { useContext } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import AppContext from '../../../context/App/AppContext'

// Types
import { Page } from '../../../context/App/types'

// Components
import HideResponded from './HideResponded'

describe('HideResponded', () => {
  const handleClickMock = vi.fn()

  it('Renders correctly', () => {
      render(
        <HideResponded
          checked={false}
          handleClick={handleClickMock} />
      )

      const element = screen.getByTestId('hide-responded')
  
      expect(element).toBeInTheDocument()
  })

  it('Hides component when child of CreatePetitionForm', () => {
    const TestComponent = ({ page }: { page: Page }) => {
      const ctx = useContext(AppContext)

      return (
        <AppContext.Provider value={{ ...ctx, activePage: page }}>
          <HideResponded
            checked={false}
            handleClick={handleClickMock} />
        </AppContext.Provider>
      )
    }

    const { rerender } = render(<TestComponent page={'Create Petition'} />)

    let element = screen.getByTestId('hide-responded')
    expect(element).toHaveClass('hidden') // Petition hidden when page = 'Create Petition'

    rerender(<TestComponent page={'Manage Petitions'} />)

    element = screen.getByTestId('hide-responded')
    expect(element).not.toHaveClass('hidden')
  })

  it('handleClick fn called on button click', () => {
    render(
      <HideResponded
        checked={false}
        handleClick={handleClickMock} />
    )

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    expect(handleClickMock).toHaveBeenCalled()
  })
})