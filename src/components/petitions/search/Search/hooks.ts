import { useContext } from "react"
import PetitionCtx from "@/components/petitions/context"

export const useHandleSearch = () => {
  const { dispatch } = useContext(PetitionCtx)

  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value

    dispatch({ type: 'SET_SEARCH_VALUE', payload: searchValue })
  }
}