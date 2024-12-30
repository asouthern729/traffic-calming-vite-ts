import { useContext } from "react"
import AppContext from "../../../context/App/AppContext"
import styles from './Search.module.css'

export const SearchInput = ({ placeholder }: { placeholder: string }) => { // Search input
  const { searchValue, dispatch } = useContext(AppContext)

  return (
    <input 
      type="text" 
      value={searchValue} 
      placeholder={placeholder}
      onChange={(e) => dispatch({ type: 'SET_SEARCH_VALUE', payload: e.currentTarget.value })} 
      className={styles.searchInput} />
  )
}

export const ClearSearchBtn = () => { // Clear search value button
  const { searchValue, dispatch } = useContext(AppContext)

  const showBtn = searchValue ? true : false

  return (
    <>
      {showBtn && (
        <button
          data-testid="clear-btn" 
          type="button"
          onClick={() => dispatch({ type: 'SET_SEARCH_VALUE', payload: '' })}
          className={styles.clearBtn}>
            Clear
        </button>
      )}
    </>
  )
}