import icon from '../../../assets/icons/recycle/recycle.svg'
import styles from './ExistingAttachment.module.css'

// Types
import { ExistingAttachmentProps } from './types'

function ExistingAttachment({ blobURL, handleDeleteBtn }: ExistingAttachmentProps) {

  return (
    <>
      {blobURL && (
        <div className={styles.container}>
          <button
            type="button"
            onClick={() => window.open(blobURL, '_blank') }
            className={styles.btn}>
              Click To View Attachment
          </button>
          <button
            type="button"
            onClick={() => handleDeleteBtn()}
            className={styles.btn}>
              <div className="mt-1">
                <img src={icon} alt="recycle icon" className="w-8" />
              </div>
          </button>
        </div>
      )}
    </>
  )
}

export default ExistingAttachment
