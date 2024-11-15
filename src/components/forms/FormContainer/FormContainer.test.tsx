import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

// Components
import FormContainer from './FormContainer'
import CreatePetitionForm from '../create/CreatePetitionForm/CreatePetitionForm'

describe('FormContainer', () => {
  const handleCancelBtnClickMock = vi.fn()
  
  it('Renders correctly', () => {

    render(
      <BrowserRouter>
        <FormContainer>
          <CreatePetitionForm handleCancelBtnClick={handleCancelBtnClickMock} />
        </FormContainer>
      </BrowserRouter>
    )

    const element = screen.getByTestId('form-container')
    expect(element).toBeInTheDocument()

    const form = screen.getByTestId('create-petition-form')
    expect(form).toBeInTheDocument() 
  })
})
