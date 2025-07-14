// Types
import * as AppTypes from '@/context/App/types'

export const setVoteTotals = (respondents: AppTypes.RespondentInterface[]) => { // Return votes object
  const votes = {
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