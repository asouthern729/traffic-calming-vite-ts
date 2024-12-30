import { Link } from 'react-router-dom'
import styles from './PetitionContainer.module.css'

// Types
import { PetitionContainerProps } from './types'

// Components
import StatusIcon from '../../petition/StatusIcon/StatusIcon'
import { Results } from './components.tsx'

function PetitionContainer({ petition }: PetitionContainerProps) {

  return (
    <Link
      to={`/update/${ petition.uuid }`}
      className={styles.container}>

      <div className={styles.topDiv}>
        <div className={styles.title}>Petition {petition.petitionId}</div>
        <div className={styles.dates}>
          <StatusIcon
            start={petition.startDate}
            end={petition.endDate} />
          <div className="flex gap-8 py-3">
            <div className="flex flex-col items-center">
              Open
              <div>{petition.startDate}</div>
            </div>
            <div className="flex flex-col items-center">
              Close
              <div>{petition.endDate}</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.middleDiv}>
        <div className={styles.subTitle}>Description</div>
        <p className={styles.description}>{petition.description}</p>
      </div>

      <Results petition={petition} />

    </Link>
  )
}

export default PetitionContainer