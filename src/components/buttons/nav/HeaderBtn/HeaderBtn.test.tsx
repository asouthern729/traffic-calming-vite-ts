import { useContext, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import AppContext, { AppProvider } from '../../../../context/App/AppContext'
import styles from './HeaderBtn.module.css'


// Components
import { ReactElement } from 'react'
import HeaderBtn from './HeaderBtn'

describe('HeaderBtn', () => {
  const handleClickMock = vi.fn()

  it('Renders correctly', () => {
      render(
        <HeaderBtn
          label={'Manage Petitions'}
          handleClick={handleClickMock} />
      )

      const button = screen.getByRole('button')
  
      expect(button).toBeInTheDocument()
      expect(screen.getByText('Manage Petitions')).toBeInTheDocument()
  })

  it('Executes handleClick fn on click', () => {
      render(
        <HeaderBtn
          label={'Manage Petitions'}
          handleClick={handleClickMock} />
      )
  
      const button = screen.getByRole('button')
      fireEvent.click(button)
  
      expect(handleClickMock).toHaveBeenCalled()
    })

    it('Renders the correct css class', () => {
      const TestComponent = ({ children }: { children: ReactElement }) => {
        return (
          <AppProvider>
            <BrowserRouter>
              {children}
            </BrowserRouter>
          </AppProvider>
        )
      }

      const TestChildComponent = ({ label }: { label: string }) => {
        const { dispatch } = useContext(AppContext)

        useEffect(() => { // Set active page to 'Manage Petitions'
          dispatch({ type: 'SET_ACTIVE_PAGE', payload: 'Manage Petitions' })
        }, [dispatch])

        return (
          <HeaderBtn
            label={label}
            handleClick={handleClickMock} />
        )
      }

      const { rerender } = render(
        <TestComponent>
          <TestChildComponent label={'Manage Petitions'} />
        </TestComponent>
      )

      let button = screen.getByRole('button')
      expect(button).toHaveClass(styles.activeBtn)

      rerender(
        <TestComponent>
          <TestChildComponent label={'Create Petition'} />
        </TestComponent>
      )

      button = screen.getByRole('button')
      expect(button).toHaveClass(styles.btn)
    })
})
