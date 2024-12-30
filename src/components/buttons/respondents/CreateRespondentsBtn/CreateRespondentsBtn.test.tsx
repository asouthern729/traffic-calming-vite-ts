import { FormProvider } from 'react-hook-form'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { mock, when, instance } from 'ts-mockito'
import { useUpdatePetitionForm } from '../../../forms/update/UpdatePetitionForm/hooks'
import * as CreateRespondentsBtnFns from './utils'

// Types
import { Petition } from '../../../../context/App/types'

// Components
import CreateRespondentsBtn from './CreateRespondentsBtn'

describe('CreateRespondentsBtn', () => {
  const petitionMock = mock<Petition>()
  when(petitionMock.Respondents).thenReturn([])

  const handleFileSelectMock = vi.fn()

  it('Renders correctly', () => {
    const TestComponent = () => {
      const { methods } = useUpdatePetitionForm(instance(petitionMock))

      return (
        <FormProvider { ...methods }>
          <form>
            <CreateRespondentsBtn />
          </form>
        </FormProvider>
      )
    }
    
    render(<TestComponent />)
    
    const button = screen.getByRole('button')
  
    expect(button).toBeInTheDocument()
  })

  it('Calls handleFileSelect on input change', () => {
    const handleFileSelectSpy = vi.spyOn(CreateRespondentsBtnFns, 'handleFileSelect').mockImplementation(handleFileSelectMock)

    const TestComponent = () => {
      const { methods } = useUpdatePetitionForm(instance(petitionMock))

      return (
        <FormProvider { ...methods }>
          <form>
            <CreateRespondentsBtn />
          </form>
        </FormProvider>
      )
    }
    
    render(<TestComponent />)

    const input = screen.getByTestId('file-select')
    fireEvent.change(input)

    expect(handleFileSelectSpy).toHaveBeenCalled()
  })
})