import icon from '../../../../assets/icons/next/next.svg'
import styles from './NextPageBtn.module.css'

// Types
import { NextPageBtnProps } from './types'

function NextPageBtn({ handleClick, disabled }: NextPageBtnProps) {
  return (
    <button 
      data-testid="next-page-btn"
      type="button"
      onClick={handleClick}
      className={styles.btn}
      disabled={disabled}>
        <img src={icon} className={'w-4 lg:w-6'} />
    </button>
  )
}

export default NextPageBtn