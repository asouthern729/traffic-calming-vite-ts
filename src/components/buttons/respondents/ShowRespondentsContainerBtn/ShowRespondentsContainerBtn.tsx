// Types
import { ShowRespondentsContainerProps } from "./types"

function ShowRespondentsContainerBtn({ label, handleClick }: ShowRespondentsContainerProps) {
  return (
    <button 
      type="button" 
      onClick={handleClick}
      className="btn btn-wide btn-secondary uppercase shadow">
        {label}
    </button>
  )
}

export default ShowRespondentsContainerBtn