import { useState } from "react"
import { setPetitionsContainer } from "."
import styles from './PetitionsContainer.module.css'

// Types
import { PetitionsContainerProps, PetitionsContainerState } from "./types"

// Components
import BackToHomeBtn from "../../buttons/nav/BackToHomeBtn/BackToHomeBtn"

function PetitionsContainer({ petitions }: PetitionsContainerProps) {
  const [state, setState] = useState<PetitionsContainerState>({ hideClosed: false })

  return (
    <div data-testid="petitions-container" className={styles.container}>
      <div className="flex items-center gap-2 mr-auto">
        <label htmlFor="hide closed" className={styles.checkboxLabel}>Hide Closed Petitions:</label>
        <input
          type="checkbox" 
          className="checkbox checkbox-secondary"
          checked={state.hideClosed}
          onChange={() => setState(prevState => ({ hideClosed: !prevState.hideClosed }))} />
      </div>
      <div className="flex flex-row gap-10 justify-around flex-wrap">
        {setPetitionsContainer(petitions, state.hideClosed)}
      </div>
      <BackToHomeBtn />
    </div>
    
  )
}

export default PetitionsContainer