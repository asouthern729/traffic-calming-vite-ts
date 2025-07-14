import icon from '@/assets/icons/cof/cof.png'
import { useRedirect } from "./hooks"

function ClosedPetition({ children }: { children: React.ReactNode }) {
  const { timer } = useRedirect()

  return (
    <div data-testid="closed-petition" className="flex flex-col gap-4 p-10 m-auto my-10 bg-neutral/10 rounded items-center w-fit">
      <img src={icon} alt="cof icon" className="w-28 lg:w-32" />
      <div className="text-neutral-content flex flex-col gap-2 items-center">
        <p className="text-xl font-bold uppercase text-center">{children}</p>
        <p className="italic text-center">You will be redirected in {timer} seconds..</p>
      </div>
    </div>
  )
}

export default ClosedPetition