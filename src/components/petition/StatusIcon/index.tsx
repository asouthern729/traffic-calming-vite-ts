// Icons
import lockedIcon from '../../../assets/icons/locked/locked-light.svg'
import lockedIconRed from '../../../assets/icons/locked/locked-red.svg'
import unlockedIcon from '../../../assets/icons/unlocked/unlocked-green.svg'

// Types
import { ReactElement } from "react"
import { SetStatusIconProps } from "./types"

export const setStatusIcon = (start: SetStatusIconProps['start'], end: SetStatusIconProps['end']): ReactElement => {
  const today = new Date()
  const startDate = new Date(start)
  const endDate = new Date(end)

  let imgSrc

  if(startDate > today) { // Upcoming petition
    imgSrc = lockedIcon
  }

  if(startDate < today && endDate > today) { // Open petition
    imgSrc = unlockedIcon
  }

  if(!imgSrc) { // Closed petition
    imgSrc = lockedIconRed
  }

  return <img src={imgSrc} alt="status icon" className="w-14" />
}