import { useQuery } from "react-query"
import { getPetitions } from "../../context/App/AppActions"
import { useValidateUser, useEnableQuery } from "../../helpers"

// Types
import { UseQueryResult } from "react-query"
import { GetPetitionsResponse } from "../../context/App/types"

export const useGetPetitions = (): UseQueryResult<GetPetitionsResponse> => { // Get peitions
  const { isAuthenticated, isLoading } = useValidateUser()

  const enabled = useEnableQuery(isAuthenticated, isLoading)

  return useQuery('getPetitions', () => getPetitions(), { enabled })
}