import styles from '../../Forms.module.css'

// Types
import { CreateRespondentFormProps } from "./types"

// Components
import { RemoveBtn, NameInput, AddressInput, OwnerInfoInputs } from "./components"

function CreateRespondentForm({ index }: CreateRespondentFormProps) {

  return (
    <div className="flex flex-col bg-success/20 p-4 lg:p-10">
      
      <RemoveBtn index={index} />

      <div className={styles.body}>

        <div className="flex gap-3 flex-wrap">
          <NameInput index={index} />
          <AddressInput index={index} />
        </div>

        <OwnerInfoInputs index={index} />

      </div>
      
    </div>
  )
}

export default CreateRespondentForm