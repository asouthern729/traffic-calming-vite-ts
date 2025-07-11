import { Link } from 'react-router'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import StatusIcon from '../../StatusIcon/StatusIcon.tsx'
import * as Components from './components'

function PetitionContainer({ petition }: { petition: AppTypes.PetitionInterface }) {

  return (
    <Link
      to={`/petitions/update/${ petition.uuid }`}
      className="flex-1 flex flex-col justify-between font-[play] p-8 bg-neutral shadow-xl lg:max-w-[400px]">
        <div className="p-6 border border-neutral-content rounded-xl">
          <h2 className="text-neutral-content text-2xl font-bold uppercase text-center">Petition {petition.petitionId}</h2>
          
          <div className="flex flex-col items-center text-neutral-content pt-6">
            <StatusIcon
              start={petition.startDate}
              end={petition.endDate} />
            <Components.PetitionDates petition={petition} />
          </div>
        </div>

        <Components.PetitionDescription petition={petition} />
        <Components.Results petition={petition} />
    </Link>
  )
}

export default PetitionContainer