import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { FormProvider } from 'react-hook-form'
import { render } from '@testing-library/react'
import { instance, mock, when } from 'ts-mockito'
import { useUpdatePetitionForm } from '../../forms/update/UpdatePetitionForm'

// Types
import { Petition, Respondent } from '../../../context/App/types'

// Components
import RespondentsContainer from './RespondentsContainer'

describe('RespondentsContainer', () => {
  const petitionMock = mock<Petition>()
  when(petitionMock.Respondents).thenReturn(Array.from({ length: 40 }).map(_ => mock<Respondent>()))

  it('Renders correctly', () => {
    const TestComponent = () => {
      const { respondents, newRespondents, methods } = useUpdatePetitionForm(instance(petitionMock))

      const queryClient = new QueryClient()

      return (
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <FormProvider { ...methods }>
              <RespondentsContainer
                respondents={respondents}
                newRespondents={newRespondents} />
            </FormProvider>
          </QueryClientProvider>
        </BrowserRouter>
      )
    }
  
    render(<TestComponent />)
  })
})
