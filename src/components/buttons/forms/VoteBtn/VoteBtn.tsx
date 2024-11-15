import yesIcon from '../../../../assets/icons/vote-yes/vote-yes.svg'
import noIcon from '../../../../assets/icons/vote-no/vote-no.svg'
import styles from './VoteBtn.module.css'

// Types
import { VoteBtnProps } from "./types"

function VoteBtn({ label, type, handleClick, active }: VoteBtnProps) {

  return (
    <button 
      type="button"
      className={`btn py-2 h-fit w-full ${ type === 'VoteYes' ? 'btn-success' : 'btn-error' } ${ active ? 'animate-pulse' : null }`}
      onClick={handleClick}>
        <div className="flex flex-col gap-3 items-center">
          <img src={type === 'VoteYes' ? yesIcon : noIcon} alt="vote icon" className="w-10 lg:w-14" />
          <div className={styles.label}>{label}</div>
        </div>
    </button>
  )
}

export default VoteBtn