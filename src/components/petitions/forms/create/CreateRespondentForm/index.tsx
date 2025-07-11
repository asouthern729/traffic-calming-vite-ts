import styles from '@/components/form-elements/Forms.module.css'

// Components
import * as Components from './components'

function CreateRespondentForm({ index }: { index: number }) {

  return (
    <div className="flex flex-col bg-success/20 p-4 lg:p-10">
      
      <Components.RemoveBtn index={index} />

      <div className={styles.body}>

        <div className="flex gap-3 flex-wrap">
          <Components.NameInput index={index} />
          <Components.AddressInput index={index} />
        </div>

        <Components.OwnerInfoInputs index={index} />

      </div>
      
    </div>
  )
}

export default CreateRespondentForm