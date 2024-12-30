import { useQuery } from "react-query"
import { useSearchParams } from 'react-router-dom'
import { verifyRespondent } from "../../context/App/AppActions"

// Types
import { UseQueryResult } from "react-query"
import { VerifyRespondentResponse } from "../../context/App/types"

export const useGetRespondent = (): UseQueryResult<VerifyRespondentResponse> => {
  const [params, _] = useSearchParams()

  const shortId = params.get('shortId')

  return useQuery(['getRespondent', shortId], () => verifyRespondent(shortId as string), { enabled: !!shortId })
}