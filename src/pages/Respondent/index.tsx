import { useQuery } from "react-query"
import { useSearchParams, useNavigate } from 'react-router-dom'
import { verifyRespondent } from "../../context/App/AppActions"
import { errorPopup } from "../../utils/Toast/Toast"

// Types
import { ReactElement } from "react"
import { UseQueryResult } from "react-query"
import { VerifyRespondentResponse } from "../../context/App/types"
import { UseVerifyPetitionProps } from "./types"

// Components
import ClosedPetition from "../../components/petition/ClosedPetition/ClosedPetition"
import CreateResponseForm from "../../components/forms/create/CreateResponseForm/CreateResponseForm"

export const useGetRespondent = (): UseQueryResult<VerifyRespondentResponse> => {
  const [params, _] = useSearchParams()

  const shortId = params.get('shortId')

  return useQuery(['getRespondent', shortId], () => verifyRespondent(shortId as string), { enabled: !!shortId })
}

export const useVerifyPetition = (respondent: UseVerifyPetitionProps['respondent'], options: UseVerifyPetitionProps['options']): 
ReactElement | null => { // Verify petition is in open state
  const { error } = options

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