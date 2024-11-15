// Types
import { Dispatch, SetStateAction } from "react"
import { RespondentsContainerState } from "../RespondentsContainer/types"

export interface PageNavBtnsContainerProps { // PageNavBtnsContainer props
  handleClick: {
    prevPage: (setState: Dispatch<SetStateAction<RespondentsContainerState>>) => void
    nextPage: (setState: Dispatch<SetStateAction<RespondentsContainerState>>) => void
  }
  pages: {
    totalPages: number
    currentPage: number
  },
  setState: Dispatch<SetStateAction<RespondentsContainerState>>
}