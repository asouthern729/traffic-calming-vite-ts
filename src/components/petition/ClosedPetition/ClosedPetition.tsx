import icon from '../../../assets/icons/cof/cof.png'
import { useRedirect } from "."

// Types
import { ClosedPetitionProps } from './types.ts'

function ClosedPetition({ label }: ClosedPetitionProps) {
  const { timer } = useRedirect()

  return (
    <div data-testid="closed-petition" className="flex flex-col gap-4 p-10 m-auto bg-secondary/10 rounded items-center">
      <img src={icon} alt="cof icon" className="w-28 lg:w-32" />
      <div className="text-neutral-content flex flex-col gap-2 items-center">
        <p className="text-xl font-bold uppercase text-center">{label}</p>
        <p className="italic text-center">You will be redirected in {timer} seconds..</p>
      </div>
    </div>
  )
}

export default ClosedPetition