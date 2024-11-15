// Types
import { HandleClickProps } from "./types"

export const handleClick = (topRef: HandleClickProps['topRef']): void => { // Handle button click
  if(topRef.current) {
    topRef.current.scrollIntoView({ behavior: 'smooth' })
  }
}