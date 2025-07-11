import voteYesIcon from '@/assets/icons/vote-yes/vote-yes.svg'
import voteNoIcon from '@/assets/icons/vote-no/vote-no.svg'
import { setVoteTotals } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const PetitionDates = ({ petition }: { petition: AppTypes.PetitionInterface }) => {

  return (
    <div className="flex gap-8 py-3">
      <div className="flex flex-col items-center">
        Open
        <div>{petition.startDate}</div>
      </div>
      <div className="flex flex-col items-center">
        Close
        <div>{petition.endDate}</div>
      </div>
    </div>
  )
}

export const PetitionDescription = ({ petition }: { petition: AppTypes.PetitionInterface }) => {

  return (
    <div className="flex flex-col text-neutral-content pt-6 mb-10 h-full">
      <div className="text-lg font-bold uppercase text-center">Description</div>
      <p className="font-[jura] italic text-center px-3">{petition.description}</p>
    </div>
  )
}

export const Results = ({ petition }: { petition: AppTypes.PetitionInterface }) => { // Petition results
  const votes = setVoteTotals(petition.Respondents || [])

  const percentage = Math.round(((votes.yes + votes.no) / (votes.yes + votes.no + votes.noResponse) * 100) || 0)

  return (
    <div data-testid="set-results" className="p-4 text-neutral-content border border-warning rounded-xl">
      <h2 className="text-center uppercase">Results</h2>

      <div className="flex gap-8 py-3 justify-around items-center">
        <YesVotes count={votes.yes} />
        <div className="text-lg text-secondary font-bold whitespace-nowrap">
          {percentage} %
        </div>
        <NoVotes count={votes.no} />
      </div>
    </div>
  )
}

const YesVotes = ({ count }: { count: number }) => {

  return (
    <div className="flex flex-col items-center gap-1">
      <img src={voteYesIcon} alt="vote yes icon" className="w-12" />
      <div className="text-center whitespace-nowrap">{count} Votes</div>
    </div>
  )
}

const NoVotes = ({ count }: { count: number }) => {

  return (
    <div className="flex flex-col items-center gap-1">
      <img src={voteNoIcon} alt="vote no icon" className="w-12" />
      <div className="text-center whitespace-nowrap">{count} Votes</div>
    </div>
  )
}