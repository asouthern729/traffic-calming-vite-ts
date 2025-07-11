import icon from '@/assets/icons/next/next.svg'
import styles from './NextPageBtn.module.css'

type NextPageBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, disabled: boolean }

function NextPageBtn(props: NextPageBtnProps) {

  return (
    <button 
      data-testid="next-page-btn"
      type="button"
      onClick={props.onClick}
      className={styles.btn}
      disabled={props.disabled}>
        <img src={icon} className={'w-4 lg:w-6'} />
    </button>
  )
}

export default NextPageBtn