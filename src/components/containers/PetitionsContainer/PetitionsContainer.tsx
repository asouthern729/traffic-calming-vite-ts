import { useState } from "react"
import styles from './PetitionsContainer.module.css'

// Types
import { PetitionsContainerProps, PetitionsContainerState } from "./types"

// Components
import BackToHomeBtn from "../../buttons/nav/BackToHomeBtn/BackToHomeBtn"
import { HideClosedCheckbox, Petitions } from "./components"

function PetitionsContainer({ petitions }: PetitionsContainerProps) {
  const [state, setState] = useState<PetitionsContainerState>({ hideClosed: false })

  return (
    <div data-testid="petitions-container" className={styles.container}>
      <HideClosedCheckbox
        hideClosed={state.hideClosed}
        setState={setState} />
      <Petitions
        petitions={petitions} 
        hideClosed={state.hideClosed} />
      <BackToHomeBtn />
    </div>
    
  )
}

export default PetitionsContainer