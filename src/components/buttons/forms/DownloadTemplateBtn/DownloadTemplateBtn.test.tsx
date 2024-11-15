import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import * as AppActions from '../../../../context/App/AppActions'

// Components
import DownloadTemplateBtn from './DownloadTemplateBtn'

describe('DownloadTemplateBtn', () => {
  it('Renders correctly', () => {
      render(
        <DownloadTemplateBtn />
      )

      const button = screen.getByRole('button')
  
      expect(button).toBeInTheDocument()
  })

  it('Executes handleClick fn on click', () => {
    const spy = vi.spyOn(AppActions, 'downloadRespondentTemplate')

    render(
      <DownloadTemplateBtn />
    )
  
    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(spy).toHaveBeenCalled()
  })
})