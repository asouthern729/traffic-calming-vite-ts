import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import { handlePrevPageBtnClick, handleNextPageBtnClick } from '../RespondentsContainer/hooks'

// Types
import { RespondentsContainerState } from '../RespondentsContainer/types'

// Components
import PageNavBtnsContainer from './PageNavBtnsContainer'

describe('PageNavBtnsContainer', () => {

  it('Renders correctly', () => {
    const TestComponent = ({ totalPages }: { totalPages: number }) => {
      const [_, setState] = useState<RespondentsContainerState>({ currentPage: 1, hideResponded: false, showContainer: true })

      return (
        <PageNavBtnsContainer
          handleClick={{
            prevPage: () => handlePrevPageBtnClick(setState),
            nextPage: () => handleNextPageBtnClick(setState) 
          }}
          pages={{ totalPages, currentPage: 1 }}
          setState={setState} />
      )
    }

    const { rerender } = render(<TestComponent totalPages={10} />)

    let element = screen.getByTestId('page-nav-container')    

    expect(element).toBeInTheDocument()
    expect(screen.getByText('Page 1 of 10')).toBeInTheDocument()

    rerender(<TestComponent totalPages={0} />)

    element = screen.getByTestId('page-nav-container')

    expect(element).toHaveClass('hidden')
  })
})