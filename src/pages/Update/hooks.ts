import { useQuery } from "react-query"
import { useParams } from "react-router"
import * as AppActions from '@/context/App/AppActions'
import { useEnableQuery } from "@/helpers/hooks"

export const useGetPetition = () => { // Get petition
  const { enabled, token } = useEnableQuery()

  const { uuid } = useParams<{ uuid: string }>() 
  
  return useQuery(['getPetition', uuid], () => AppActions.getPetition(uuid as string), { enabled: enabled && !!token })
}