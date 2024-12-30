import { FormProvider } from 'react-hook-form'
import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { mock, when, instance } from 'ts-mockito'
import { useUpdatePetitionForm } from '../../../forms/update/UpdatePetitionForm/hooks'
import * as CreateRespondentBtnFns from './utils'

// Types
import { Petition } from '../../../../context/App/types'

// Components
import CreateBtn from './CreateRespondentBtn'

describe('CreateBtn', () => {
  const petitionMock = mock<Petition>()
  when(petitionMock.Respondents).thenReturn([])

  it('Renders correctly', () => {
    const TestComponent = () => {
      const { methods } = useUpdatePetitionForm(instance(petitionMock))

      return (
        <FormProvider { ...methods }>
          <form>
            <CreateBtn />
          </form>
        </FormProvider>
      )
    }

    render(<TestComponent />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })

  it('Calls handleCreateBtnClick on btn click', () => {
    const handleCreateBtnClickSpy = vi.spyOn(CreateRespondentBtnFns, 'handleCreateBtnClick')

    const TestComponent = () => {
      const { methods } = useUpdatePetitionForm(instance(petitionMock))

      return (
        <FormProvider { ...methods }>
          <form>
            <CreateBtn />
          </form>
        </FormProvider>
      )
    }

    render(<TestComponent />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleCreateBtnClickSpy).toHaveBeenCalled()
  })
})