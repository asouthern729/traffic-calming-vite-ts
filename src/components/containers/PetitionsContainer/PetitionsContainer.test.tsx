import { BrowserRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { instance, mock, when } from 'ts-mockito'

// Types
import { Petition, Respondent } from '../../../context/App/types'

// Components
import PetitionsContainer from './PetitionsContainer'

describe('PetititonsContainer', () => {
  const petitionsMock = Array.from({ length: 5 }).map(_ => mock<Petition>())
  const respondentsMock = Array.from({ length: 5 }).map(_ => mock<Respondent>())

  petitionsMock.forEach(petition => {
    const today = new Date()

    when(petition.startDate).thenReturn(today.toString())
    when(petition.endDate).thenReturn(new Date(today.setFullYear(today.getFullYear() + 1)).toString())
    when(petition.Respondents).thenReturn(respondentsMock.map(respondent => instance(respondent)))
  })

  it('Renders correctly', () => {
      render(
        <BrowserRouter>
          <PetitionsContainer petitions={petitionsMock.map(petition => instance(petition))} />
        </BrowserRouter>
      )
  
      const element = screen.getByTestId('petitions-container')

      expect(element).toBeInTheDocument()
  })

  it('setPetitionsContainer returns the correct elements', async () => {
    render(
      <BrowserRouter>
        <PetitionsContainer petitions={petitionsMock.map(petition => instance(petition))} />
      </BrowserRouter>
    )

    const elements = screen.queryAllByRole('link')

    expect(elements).toHaveLength(6) // 5 petititons + BackToHomeBtn
  })

  it('onChange handler updates state', () => {
    render(
      <BrowserRouter>
        <PetitionsContainer petitions={petitionsMock.map(petition => instance(petition))} />
      </BrowserRouter>
    )

    const input = screen.getByRole('checkbox')

    expect(input).not.toBeChecked()

    fireEvent.click(input)

    expect(input).toBeChecked()
  })
})