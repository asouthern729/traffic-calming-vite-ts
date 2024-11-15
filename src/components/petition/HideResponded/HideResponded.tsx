import { useContext } from 'react'
import AppContext from '../../../context/App/AppContext'
import styles from './HideRespondend.module.css'

// Types
import { HideRespondedProps } from './types'

function HideResponded({ checked, handleClick }: HideRespondedProps) {
  const { activePage } = useContext(AppContext)

  return (
    <div data-testid="hide-responded" className={activePage === 'Create Petition' ? 'hidden' : styles.container}>
      <label htmlFor="hide responded" className={styles.checkboxLabel}>Hide Responded:</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-secondary"
        checked={checked}
        onChange={handleClick} />
    </div>
  )
}

export default HideResponded