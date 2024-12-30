import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { mock, instance, when } from 'ts-mockito'
import * as PetitionContainerFns from './utils'

// Types
import { Petition, Respondent, Response } from '../../../context/App/types'

// Components
import PetitionContainer from './PetitionContainer'

describe('PetitionContainer', () => {
  const petitionMock = mock<Petition>()
  const respondentMock = mock<Respondent>()
  const responseMock = mock<Response>()
  when(responseMock.response).thenReturn(true)

  when(respondentMock.Response).thenReturn(instance(responseMock))

  const respondentsMockArray = Array.from({ length: 5 }).map(_ => instance(respondentMock))

  when(petitionMock.Respondents).thenReturn(respondentsMockArray)
  
  it('Renders correctly', () => {
      render(
        <BrowserRouter>
          <PetitionContainer petition={instance(petitionMock)} />
        </BrowserRouter>
      )

      const element = screen.getByRole('link')
  
      expect(element).toBeInTheDocument()
  })

  it('setVoteTotals returns the correct object', () => {
    const { setVoteTotals } = PetitionContainerFns

    const TestComponent = ({ petition }: { petition: Petition }) => {
      const votes = setVoteTotals(petition.Respondents)

      return (
        <BrowserRouter>
          <div>{votes.yes} Yes Votes</div>
        </BrowserRouter>
      )
    }

    render(<TestComponent petition={instance(petitionMock)} />)

    expect(screen.getByText('5 Yes Votes')).toBeInTheDocument()
  })
})
