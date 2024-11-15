// Types
import { Petition, Respondent } from "../../../context/App/types"

export interface PetitionContainerProps { // PetitionContainer props
  petition: Petition
}

export interface SetVoteTotalsProps { // setVoteTotals fn props
  respondents: Respondent[]
}

export interface SetResultsProps { // setResults fn props
  votes: Votes
}

export interface Votes { 
  yes: number
  no: number
  noResponse: number 
}