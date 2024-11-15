// Types
import { SubmitBtnProps } from "./types"

function SubmitBtn({ handleClick, disabled }: SubmitBtnProps) {
  return (
    <button 
      type="submit"
      disabled={disabled}
      className="btn btn-primary uppercase text-lg shadow rounded-none w-full"
      onClick={handleClick}>
        Submit
    </button>
  )
}

export default SubmitBtn