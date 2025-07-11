import { useQuery } from "react-query"
import { useEnableQuery } from "@/helpers/hooks"
import * as AppActions from '@/context/App/AppActions'

export const useGetPetitions = () => { // Get petitions

  return useQuery('getPetitions', () => AppActions.getPetitions())
}