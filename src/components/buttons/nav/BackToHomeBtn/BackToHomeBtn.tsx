import { Link } from 'react-router-dom'
import styles from './BackToHomeBtn.module.css'

function BackToHomeBtn() {
  return (
    <Link
      to={'/'}
      className={styles.btn}>
        Back To Home
    </Link>
  )
}

export default BackToHomeBtn