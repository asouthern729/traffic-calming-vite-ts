import { useNavigate } from "react-router-dom"
import { errorPopup } from "../../utils/Toast/Toast"

// Types
import { Respondent } from "../../context/App/types"

// Components
import ClosedPetition from "../../components/petition/ClosedPetition/ClosedPetition"
import CreateResponseForm from "../../components/forms/create/CreateResponseForm/CreateResponseForm"

export const VerifyRespondent = ({ respondent, error }: { respondent: Respondent | undefined, error: string | undefined }) => { // Verify petition respondent
  const navigate = useNavigate()

  if(!respondent && error) { // Handle !respondent / respondent cannot be verified / respondent has already responded
    navigate('/')
    errorPopup(error)
  }

  const startDate = new Date(respondent?.Petition.startDate as string)
  const endDate = new Date(respondent?.Petition.endDate as string)
  const today = new Date()

  if(startDate < today && endDate < today) { // Closed petition
    return <ClosedPetition label={'Petititon is now closed'} />
  }

  if(startDate > today) { // Future petition
    return <ClosedPetition label={'Petition is not yet open'} />
  }

  if(respondent) {
    return <CreateResponseForm respondent={respondent} />
  } else return null
}