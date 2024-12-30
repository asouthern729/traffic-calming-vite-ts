import styles from './HeaderBtn.module.css'

// Types
import { HeaderBtnProps } from "./types"

function HeaderBtn({ label, handleClick }: HeaderBtnProps) {

  return (
    <button
      type="button"
      onClick={handleClick}
      className={styles.btn}>
        {label}
    </button>
  )
}

export default HeaderBtn