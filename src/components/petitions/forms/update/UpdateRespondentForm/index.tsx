import styles from '@/components/form-elements/Forms.module.css'

// Components
import * as Components from './components'

function UpdateRespondentForm({ index }: { index: number }) {

  return (
    <div className="flex flex-col bg-neutral/50 p-4 lg:p-10">
      <Components.Header index={index} />

      <div className={styles.body}>
        <div className="flex gap-4 flex-wrap">
          <Components.NameInput index={index} />
          <Components.AddressInput index={index} />
        </div>

        <Components.OwnerInfoInputs index={index} />
      </div>
      
      <Components.DeleteRespondentBtn index={index} />
    </div>
  )
}

export default UpdateRespondentForm