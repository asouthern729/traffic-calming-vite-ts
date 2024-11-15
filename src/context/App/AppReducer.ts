// Types
import { AppReducerProps } from './types'

const appReducer = (state: AppReducerProps['state'], action: AppReducerProps['action']) => {
  switch(action.type) {
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.payload
      }
    case 'OPEN_CLOSE_SHOW_MENU':
      return {
        ...state,
        showMenu: action.payload
      }
    case 'SET_ACTIVE_PAGE':
      return {
        ...state,
        activePage: action.payload
      }
    case 'TOGGLE_SEARCHING_RESPONDENTS':
      return {
        ...state,
        searchingRespondents: !state.searchingRespondents
      }
    case 'RESET_CTX':
      return {
        ...state,
        searchingRespondents: false,
        searchValue: ''
      }
    default:
      return state
  }
}

export default appReducer