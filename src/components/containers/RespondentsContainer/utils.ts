// Types
import { HandlePageBtnClickProps } from "./types"

export const handleNextPageBtnClick = (setState: HandlePageBtnClickProps['setState']): void => { // Handle next page btn click
  setState(prevState => ({ ...prevState, currentPage: prevState.currentPage + 1 }))
}

export const handlePrevPageBtnClick = (setState: HandlePageBtnClickProps['setState']): void => { // Handle prev page btn click
  setState(prevState => ({ ...prevState, currentPage: prevState.currentPage - 1 }))
}