// Types
import { Page } from "../../../../context/App/types"

export interface HeaderBtnProps { // HeaderBtn props
  label: string
  handleClick: () => void
}

export interface SetHeaderBtnStyleProps { // setHeaderBtnStyle fn props
  activePage: Page
  label: Page | string 
}

export interface SetHeaderBtnProps { // setHeaderBtnProps fn props
  props: HeaderBtnProps
}