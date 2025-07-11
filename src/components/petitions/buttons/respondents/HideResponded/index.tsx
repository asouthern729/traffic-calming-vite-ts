import { useContext } from 'react'
import PetitionCtx from '@/components/petitions/context'
import { useSetVisibility } from './hooks'

function HideResponded() {
  const { hideResponded, dispatch } = useContext(PetitionCtx)

  const visible = useSetVisibility()

  if(!visible) return null

  return (
    <div data-testid="hide-responded" className="flex gap-2 items-center mr-auto">
      <label htmlFor="hide responded" className="text-neutral-content font-[jura] text-xl font-extrabold text-center">Hide Responded:</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-secondary"
        checked={hideResponded}
        onChange={() => dispatch({ type: 'TOGGLE_HIDE_RESPONDED' })} />
    </div>
  )
}

export default HideResponded