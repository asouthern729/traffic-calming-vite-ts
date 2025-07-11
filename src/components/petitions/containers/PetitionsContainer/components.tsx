// Types
import * as AppTypes from '@/context/App/types'

// Components
import PetitionContainer from "../../../petition/containers/PetitionContainer"

type HideClosedCheckboxProps = { hideClosed: boolean, onChange: React.ChangeEventHandler<HTMLInputElement> }

export const HideClosedCheckbox = (props: HideClosedCheckboxProps) => { // Hide closed petitions checkbox

  return (
    <div className="flex items-center gap-2 mr-auto">
      <label htmlFor="hide closed" className="text-neutral-content font-[jura] text-xl font-bold text-center">Hide Closed Petitions:</label>
      <input
        type="checkbox" 
        className="checkbox checkbox-secondary"
        checked={props.hideClosed}
        onChange={props.onChange} />
    </div>
  )
}

export const Petitions = ({ petitions, hideClosed }: { petitions: AppTypes.PetitionInterface[], hideClosed: boolean }) => { // Set petitions container
  
  return (
    <div className="flex flex-row gap-10 justify-around flex-wrap">
      {petitions.map(petition => (
        <Petition
          key={`petition-${ petition.uuid }`}
          petition={petition}
          hideClosed={hideClosed} />
      ))}
    </div>
  )
}

const Petition = ({ petition, hideClosed }: { petition: AppTypes.PetitionInterface, hideClosed: boolean }) => {
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
}