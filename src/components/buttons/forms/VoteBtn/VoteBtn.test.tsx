import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

// Components
import VoteBtn from './VoteBtn'

describe('VoteBtn', () => {
  const handleClickMock = vi.fn()

  it('Renders correctly', () => {
      render(
        <VoteBtn
          label={'Vote Yes'}
          type={'VoteYes'}
          handleClick={handleClickMock}
          active={false} />
      )

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()

      const text = screen.getByText('Vote Yes')
      expect(text).toBeInTheDocument()
  })

  it('Conditionally renders the correct tailwind class', () => {
    const { rerender } = render(
      <VoteBtn
        label={'Vote Yes'}
        type={'VoteYes'}
        handleClick={handleClickMock}
        active={false} />
    )

    let button = screen.getByRole('button')
    expect(button).toHaveClass('btn-success')

    rerender(
      <VoteBtn
        label={'Vote No'}
        type={'VoteNo'}
        handleClick={handleClickMock}
        active={true} />
    )

    button = screen.getByRole('button')
    expect(button).toHaveClass('btn-error animate-pulse')
  })

  it('Conditionally renders the correct icon', () => {
    const { rerender } = render(
      <VoteBtn
        label={'Vote Yes'}
        type={'VoteYes'}
        handleClick={handleClickMock}
        active={false} />
    )

    let icon = screen.getByRole('img')
    expect(icon).toHaveAttribute('src', '/traffic-calming/src/assets/icons/vote-yes/vote-yes.svg')

    rerender(
      <VoteBtn
        label={'Vote No'}
        type={'VoteNo'}
        handleClick={handleClickMock}
        active={false} />
    )

    icon = screen.getByRole('img')
    expect(icon).toHaveAttribute('src', '/traffic-calming/src/assets/icons/vote-no/vote-no.svg')
  })
})