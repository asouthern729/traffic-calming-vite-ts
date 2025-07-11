import { SetVoteTotalsProps, Votes } from "./types"

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