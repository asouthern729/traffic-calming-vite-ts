// Components
import * as Components from './components'

type VoteBtnProps = { type: 'VoteYes' | 'VoteNo', onClick: React.MouseEventHandler<HTMLButtonElement>, children: React.ReactNode }

function VoteBtn(props: VoteBtnProps) {
  const active = !!props.children?.toString().includes('Confirm')

  return (
    <button 
      type="button"
      className={`btn py-4 h-fit w-full ${ props.type === 'VoteYes' ? 'btn-success' : 'btn-error' } ${ active ? 'animate-pulse' : null }`}
      onClick={props.onClick}>
        <Components.BtnContent type={props.type}>
          {props.children}
        </Components.BtnContent>
    </button>
  )
}

export default VoteBtn