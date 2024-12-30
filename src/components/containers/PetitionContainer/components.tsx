import voteYesIcon from '../../../assets/icons/vote-yes/vote-yes.svg'
import voteNoIcon from '../../../assets/icons/vote-no/vote-no.svg'
import { setVoteTotals } from './utils'
import styles from './PetitionContainer.module.css'

// Types
import { Petition } from '../../../context/App/types'

export const Results = ({ petition }: { petition: Petition }) => { // Petition results
  const votes = setVoteTotals(petition.Respondents)

  const percentage = Math.round(((votes.yes + votes.no) / (votes.yes + votes.no + votes.noResponse) * 100) || 0)

  return (
    <div data-testid="set-results" className={styles.bottomDiv}>

      <h2 className={styles.subTitle}>Results</h2>

      <div className="flex gap-8 py-3 justify-around items-center">
        <div className="flex flex-col items-center gap-1">
          <img src={voteYesIcon} alt="vote yes icon" className="w-12" />
          <div className={styles.vote}>{votes.yes} Votes</div>
        </div>
        <div className="text-lg text-secondary font-bold whitespace-nowrap">
          {percentage} %
        </div>
        <div className="flex flex-col items-center gap-1">
          <img src={voteNoIcon} alt="vote yes icon" className="w-12" />
          <div className={styles.vote}>{votes.no} Votes</div>
        </div>
      </div>
      
    </div>
  )
}