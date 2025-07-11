import { useContext } from "react"
import PetitionCtx from "@/components/petitions/context"
import { useHandleSearch } from './hooks'

export const Header = () => {

  return (
    <h2 className="text-neutral-content text-xl font-[play] uppercase">Search:</h2>
  )
}

export const SearchInput = () => {
  const { searchValue } = useContext(PetitionCtx)

  const handleSearch = useHandleSearch()

  return (
    <input 
      type="text" 
      value={searchValue} 
      placeholder="by name or address.." 
      onChange={(e) => handleSearch(e)} 
      className="input w-[200px]" />
  )
}

export const ClearBtn = () => { // Clear search button
  const { searchValue, dispatch } = useContext(PetitionCtx)

  if(!searchValue) return null

  return (
    <button 
      type="button" 
      onClick={() => dispatch({ type: 'SET_SEARCH_VALUE', payload: '' })}
      className="absolute btn btn-primary uppercase -bottom-9 z-10 h-[30px] w-full shadow-xl">
        Clear
    </button>
  )
}