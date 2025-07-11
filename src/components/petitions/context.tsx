import { createContext, useReducer } from "react"

// Types
import { ReactNode, Reducer, Dispatch } from "react"

type PetitionCtx = {
  dispatch: Dispatch<PetitionAction>
  currentRespondentsPage: number
  hideResponded: boolean
  searchValue: string
  showRespondentsContainer: boolean
  totalRespondentsPages: number
}

type PetitionState = Omit<PetitionCtx, 'dispatch'>

type PetitionAction =
  | { type: 'SET_SEARCH_VALUE', payload: string }
  | { type: 'TOGGLE_HIDE_RESPONDED' }
  | { type: 'TOGGLE_SHOW_RESPONDENTS_CONTAINER' }
  | { type: 'SET_CURRENT_RESPONDENTS_PAGE', payload: number }
  | { type: 'SET_TOTAL_RESPONDENTS_PAGES', payload: number }

const initialState: PetitionState = {
  currentRespondentsPage: 1,
  hideResponded: false,
  searchValue: '',
  showRespondentsContainer: false,
  totalRespondentsPages: 1
}

const PetitionCtx = createContext<PetitionCtx>({
  ...initialState,
  dispatch: () => null
})

const PetitionReducer = (state: PetitionState, action: PetitionAction) => {

  switch(action.type) {
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.payload
      }
    case 'TOGGLE_HIDE_RESPONDED':
      return {
        ...state,
        hideResponded: !state.hideResponded
      }
    case 'TOGGLE_SHOW_RESPONDENTS_CONTAINER':
      return {
        ...state,
        showRespondentsContainer: !state.showRespondentsContainer
      }
    case 'SET_CURRENT_RESPONDENTS_PAGE':
      return {
        ...state,
        currentRespondentsPage: action.payload
      }
    case 'SET_TOTAL_RESPONDENTS_PAGES':
      return {
        ...state,
        totalRespondentsPages: action.payload
      }
    default:
      return state
  }
}

export const PetitionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<PetitionState,PetitionAction>>(PetitionReducer, initialState)

  return (
    <PetitionCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </PetitionCtx.Provider>
  )
}

export default PetitionCtx