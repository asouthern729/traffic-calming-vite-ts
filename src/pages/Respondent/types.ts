// Types
import { Respondent } from "../../context/App/types"

export interface UseVerifyPetitionProps { // useVerifyPetition hook props
  respondent: Respondent | undefined
  options: {
    error: string | undefined
  }
}