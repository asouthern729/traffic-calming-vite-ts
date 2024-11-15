import { useQuery } from "react-query"
import { getPetitions } from "../../context/App/AppActions"

// Types
import { UseQueryResult } from "react-query"
import { GetPetitionsResponse } from "../../context/App/types"

export const useGetPetitions = (): UseQueryResult<GetPetitionsResponse> => { // Get peitions
  return useQuery('getPetitions', () => getPetitions())
}