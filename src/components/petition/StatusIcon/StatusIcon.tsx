// Types
import { StatusIconProps } from "./types"

// Components
import { Icon } from "./components"

function StatusIcon({ start, end }: StatusIconProps) {
  
  return (
    <Icon 
      start={start}
      end={end} />
  )
}

export default StatusIcon