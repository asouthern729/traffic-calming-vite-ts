import { setStatusIcon } from "."

// Types
import { StatusIconProps } from "./types"

function StatusIcon({ start, end }: StatusIconProps) {
  return (
    <>
      {setStatusIcon(start, end)}
    </>
  )
}

export default StatusIcon