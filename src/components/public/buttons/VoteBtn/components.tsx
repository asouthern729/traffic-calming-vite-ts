import styles from './VoteBtn.module.css'

// Icons
import yesIcon from '@/assets/icons/vote-yes/vote-yes.svg'
import noIcon from '@/assets/icons/vote-no/vote-no.svg'

export const BtnContent = ({ type, children }: { type: 'VoteYes' | 'VoteNo', children: React.ReactNode }) => {
  const src = type === 'VoteNo' ? noIcon : yesIcon

  return (
    <div className="flex flex-col gap-1 items-center lg:gap-2">
      <img src={src} alt="vote icon" className="w-10 lg:w-14" />
      <div className={styles.label}>{children}</div>
    </div>
  )
}