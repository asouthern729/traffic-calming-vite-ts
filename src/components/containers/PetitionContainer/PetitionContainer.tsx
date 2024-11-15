import { Link } from 'react-router-dom'
import { setVoteTotals, setResults } from './index.tsx'
import styles from './PetitionContainer.module.css'

// Types
import { PetitionContainerProps } from './types'

// Components
import StatusIcon from '../../petition/StatusIcon/StatusIcon'

function PetitionContainer({ petition }: PetitionContainerProps) {
  const votes = setVoteTotals(petition.Respondents)

  return (
    <Link
      to={`/update/${ petition.uuid }`}
      className={styles.container}>

      <section className={styles.topDiv}>
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
      </section>

      <section className={styles.middleDiv}>
        <div className={styles.subTitle}>Description</div>
        <p className={styles.description}>{petition.description}</p>
      </section>

      {setResults(votes)}

    </Link>
  )
}

export default PetitionContainer