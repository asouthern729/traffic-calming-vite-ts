import { useNavigate } from "react-router"
import { errorPopup } from "../../utils/Toast/Toast"

// Types
import * as AppTypes from '@/context/App/types'

// Components
import ClosedPetition from "@/components/petition/ClosedPetition"
import CreateResponseForm from "@/components/public/forms/create/CreateResponseForm"

export const VerifyRespondent = ({ respondent, error }: { respondent: AppTypes.RespondentInterface | undefined, error: string | undefined }) => { // Verify petition respondent
  const navigate = useNavigate()

  if(!respondent) { // Handle !respondent / respondent cannot be verified / respondent has already responded
    navigate('/public')
    errorPopup(error)
    return 
  }

  const startDate = new Date(respondent?.Petition?.startDate as string)
  const endDate = new Date(respondent?.Petition?.endDate as string)
  const today = new Date()

  if(startDate < today && endDate < today) { // Closed petition
    return (
      <ClosedPetition>
        Petititon is now closed
      </ClosedPetition>
    ) 
  }

  if(startDate > today) { // Future petition
    return (
      <ClosedPetition>
        Petition is not yet open
      </ClosedPetition>
    )
  }

  return (
    <CreateResponseForm respondent={respondent} />
  )
}