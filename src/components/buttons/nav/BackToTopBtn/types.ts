// Types
import { RefObject } from "react"

export interface BackToTopBtnProps { // BackToTopBtn props
  topRef: RefObject<HTMLDivElement>
}

export interface HandleClickProps { // handleClick fn props
  topRef: RefObject<HTMLDivElement>
}