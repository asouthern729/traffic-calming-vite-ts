import { useQuery } from "react-query"
import { useLocation } from "react-router-dom"
import { getPetition } from "../../context/App/AppActions"
import { useValidateUser, useEnableQuery } from "../../helpers"

// Types
import { UseQueryResult } from "react-query"
import { GetPetitionResponse } from "../../context/App/types"

export const useGetPetition = (): UseQueryResult<GetPetitionResponse> => { // Get petition
  const { isAuthenticated, isLoading } = useValidateUser()

  const enabled = useEnableQuery(isAuthenticated, isLoading)

  const pathname = useLocation().pathname.split('/')
  
  const uuid = pathname[pathname.length - 1]
  
  return useQuery(['getPetition', uuid], () => getPetition(uuid), { enabled: enabled && !!uuid })
}