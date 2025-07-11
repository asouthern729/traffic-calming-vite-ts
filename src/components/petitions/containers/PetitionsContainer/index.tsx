import { useState } from "react"

// Types
import * as AppTypes from '@/context/App/types'

// Components
import BackToHomeBtn from "@/components/layout/buttons/nav/BackToHomeBtn"
import * as Components from './components'

function PetitionsContainer({ petitions }: { petitions: AppTypes.PetitionInterface[] }) {
  const [state, setState] = useState<{ hideClosed: boolean }>({ hideClosed: false })

  return (
    <div data-testid="petitions-container" className="flex flex-col gap-10 p-6 my-10 bg-neutral/10 rounded lg:p-10 lg:pt-6">
      <Components.HideClosedCheckbox
        hideClosed={state.hideClosed}
        onChange={() => setState(prevState => ({ hideClosed: !prevState.hideClosed }))} />
      <Components.Petitions
        petitions={petitions} 
        hideClosed={state.hideClosed} />
      <BackToHomeBtn />
    </div>
    
  )
}

export default PetitionsContainer