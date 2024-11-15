import { handleClick } from "."

// Types
import { BackToTopBtnProps } from "./types"

function BackToTopBtn({ topRef }: BackToTopBtnProps) {
  return (
    <button 
      type="button" 
      className="btn btn-secondary btn-outline btn-sm uppercase"
      onClick={() => handleClick(topRef)}>
        Back To Top
    </button>
  )
}

export default BackToTopBtn