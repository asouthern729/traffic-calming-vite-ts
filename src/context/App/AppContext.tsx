import { Reducer, createContext, useReducer } from 'react'
import appReducer from './AppReducer'

// Types
import { ReactNode } from 'react'
import { AppContextObj, AppState, AppAction } from './types'

const AppContext = createContext<AppContextObj>({
  dispatch: () => {},
  activePage: 'Public',
  searchingRespondents: false,
  searchValue: '',
  showMenu: false
})

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const initialState: AppState = {
    activePage: 'Public',
    searchingRespondents: false,
    searchValue: '',
    showMenu: false
  }

  const [state, dispatch] = useReducer<Reducer<AppState, AppAction>>(appReducer, initialState)

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext