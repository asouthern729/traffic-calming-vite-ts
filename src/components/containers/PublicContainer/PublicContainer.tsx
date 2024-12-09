import styles from './PublicContainer.module.css'

// Components
import ValidateRespondentForm from "../../forms/get/ValidateRespondentForm/ValidateRespondentForm"

function PublicContainer() {
  return (
    <div className={styles.container}>
      <ValidateRespondentForm />
    </div>
  )
}

export default PublicContainer