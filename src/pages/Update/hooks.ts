import { useQuery } from "react-query"
import { getPetition } from "../../context/App/AppActions"

// Types
import { UseQueryResult } from "react-query"
import { GetPetitionResponse } from "../../context/App/types"

export const useGetPetition = (uuid: string): UseQueryResult<GetPetitionResponse> => { // Get petition
  return useQuery(['getPetition', uuid], () => getPetition(uuid), { enabled: !!uuid })
}