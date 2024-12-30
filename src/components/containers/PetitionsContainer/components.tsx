// Types
import { Dispatch, SetStateAction } from "react"
import { Petition } from "../../../context/App/types"
import { PetitionsContainerState } from "./types"
import styles from './PetitionsContainer.module.css'

// Components
import PetitionContainer from "../PetitionContainer/PetitionContainer"

export const HideClosedCheckbox = ({ hideClosed, setState }: { hideClosed: boolean, setState: Dispatch<SetStateAction<PetitionsContainerState>> }) => { // Hide closed petitions checkbox

  return (
    <div className="flex items-center gap-2 mr-auto">
      <label htmlFor="hide closed" className={styles.checkboxLabel}>Hide Closed Petitions:</label>
      <input
        type="checkbox" 
        className="checkbox checkbox-secondary"
        checked={hideClosed}
        onChange={() => setState(prevState => ({ hideClosed: !prevState.hideClosed }))} />
    </div>
  )
}

export const Petitions = ({ petitions, hideClosed }: { petitions: Petition[], hideClosed: boolean }) => { // Set petitions container
  
  return (
    <div className="flex flex-row gap-10 justify-around flex-wrap">
      {petitions.map(petition => {
        if(hideClosed) {
          const endDate = new Date(petition.endDate)
          const today = new Date()

          if(today < endDate) {
            return (
              <PetitionContainer 
                key={`petition-container-${ petition.petitionId }`}
                petition={petition} />
            )
          }
        }

        return (
          <PetitionContainer 
            key={`petition-container-${ petition.petitionId }`}
            petition={petition} />
        )
      })}
    </div>
  )
}