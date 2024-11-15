import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../../context/App/AppContext'
import { APP_TITLE } from '../../../config'
import styles from './Header.module.css'

// Components
import HeaderBtnsContainer from '../../containers/HeaderBtnsContainer/HeaderBtnsContainer'
import HandleMenuVisibilityTimer from '../../../utils/HandleMenuVisibilityTimer/HandleMenuVisibilityTimer'

function Header() {
  const { showMenu } = useContext(AppContext)

  return (
    <header className={styles.header}>
      
      {!showMenu && (
        <Link to={'/'}>
          <div className={styles.title}>
            <h1 className={styles.h1}>City of Franklin</h1>
            <h2 className={styles.h2}>{APP_TITLE}</h2>
          </div>
        </Link>
      )}

      <HandleMenuVisibilityTimer>
        <HeaderBtnsContainer />
      </HandleMenuVisibilityTimer>
    </header>
  )
}

export default Header
