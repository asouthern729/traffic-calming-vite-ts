import styles from './PetitionContainer.module.css'

// Icons
import voteYesIcon from '../../../assets/icons/vote-yes/vote-yes.svg'
import voteNoIcon from '../../../assets/icons/vote-no/vote-no.svg'

// Types
import { ReactElement } from "react"
import { SetVoteTotalsProps, Votes, SetResultsProps } from "./types"

export const setVoteTotals = (respondents: SetVoteTotalsProps['respondents']): Votes => { // Return votes object
  const votes: Votes = {
    yes: 0,
    no: 0,
    noResponse: 0
  }

  respondents.forEach(respondent => {
    if(respondent.Response) {
      if(respondent.Response.response) {
        votes.yes += 1
      } else votes.no += 1
    } else votes.noResponse += 1
  })

  return votes
}

export const setResults = (votes: SetResultsProps['votes']): ReactElement => { // Set results div
  const percentage = Math.round(((votes.yes + votes.no) / (votes.yes + votes.no + votes.noResponse) * 100) || 0)

  return (
    <section data-testid="set-results" className={styles.bottomDiv}>
      <div className={styles.subTitle}>Results</div>
      <div className="flex gap-8 py-3 justify-around items-center">
        <div className="flex flex-col gap-1 items-center">
          <img src={voteYesIcon} alt="vote yes icon" className="w-12" />
          <div className={styles.vote}>{votes.yes} Votes</div>
        </div>
        <div className="text-lg text-secondary font-bold">
          {percentage} %
        </div>
        <div className="flex flex-col gap-1 items-center">
          <img src={voteNoIcon} alt="vote yes icon" className="w-12" />
          <div className={styles.vote}>{votes.no} Votes</div>
        </div>
      </div>
    </section>
  )
}