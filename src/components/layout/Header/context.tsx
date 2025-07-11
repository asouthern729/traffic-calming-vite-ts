import { createContext, useReducer } from "react"

// Types
import { ReactNode, Reducer, Dispatch } from "react"

export type PagesType =
  | 'Petitions'
  | 'Public'

type HeaderCtx = {
  dispatch: Dispatch<HeaderAction>
  activePage: PagesType
  expanded: boolean
}

type HeaderState = Omit<HeaderCtx, 'dispatch'>

type HeaderAction =
  | { type: 'SET_ACTIVE_PAGE', payload: PagesType }
  | { type: 'TOGGLE_EXPANDED' }

const initialState: HeaderState = {
  activePage: 'Public',
  expanded: false
}

const HeaderCtx = createContext<HeaderCtx>({
  ...initialState,
  dispatch: () => null,
  expanded: false
})

const HeaderReducer = (state: HeaderState, action: HeaderAction) => {

  switch(action.type) {
    case 'SET_ACTIVE_PAGE':
      return {
        ...state,
        activePage: action.payload
      }
    case 'TOGGLE_EXPANDED':
      return {
        ...state,
        expanded: !state.expanded
      }
    default:
      return state
  }
}

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<HeaderState,HeaderAction>>(HeaderReducer, initialState)

  return (
    <HeaderCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </HeaderCtx.Provider>
  )
}

export default HeaderCtx