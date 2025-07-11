import { useQuery } from "react-query"
import { useSearchParams } from 'react-router'
import { verifyRespondent } from "../../context/App/AppActions"

export const useGetRespondent = () => {
  const [params, _] = useSearchParams()

  const shortId = params.get('shortId') as string

  return useQuery(['getRespondent', shortId], () => verifyRespondent(shortId), { enabled: !!shortId })
}