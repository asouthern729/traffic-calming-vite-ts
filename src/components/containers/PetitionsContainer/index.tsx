// Types
import { ReactElement } from "react"
import { SetPetitionsContainerProps } from "./types"

// Components
import PetitionContainer from "../PetitionContainer/PetitionContainer"

export const setPetitionsContainer = (petitions: SetPetitionsContainerProps['petitions'], hideClosed: SetPetitionsContainerProps['hideClosed']): (ReactElement|undefined)[] => { // Set petitions container
  return petitions.map(petition => {
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
  })
}