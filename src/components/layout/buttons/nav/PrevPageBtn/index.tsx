import icon from '@/assets/icons/prev/prev.svg'  
import styles from './PrevPageBtn.module.css'

type PrevPageBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, disabled: boolean }

function PrevPageBtn(props: PrevPageBtnProps) {

  return (
    <button
      data-testid="prev-page-btn" 
      type="button"
      onClick={props.onClick}
      className={styles.btn}
      disabled={props.disabled}>
        <img src={icon} className={'w-4 lg:w-6'} />
    </button>
  )
}

export default PrevPageBtn