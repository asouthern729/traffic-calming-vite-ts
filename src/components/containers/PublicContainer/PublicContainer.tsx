import styles from './PublicContainer.module.css'

// Components
import ValidateRespondentForm from "../../forms/get/ValidateRespondentForm/ValidateRespondentForm"

function PublicContainer() {
  return (
    <div className={styles.container}>
      <ValidateRespondentForm />
      <p className="text-neutral-content text-center"><a href="https://www.franklintn.gov/government/departments-a-j/engineering/transportation/neighborhood-traffic-calming-program" target="_blank" className="text-info">Click here</a> for more information about City of Franklin traffic calming initiatives</p>
    </div>
  )
}

export default PublicContainer