import styles from '../../Forms.module.css'

// Types
import { UpdateRespondentFormProps } from "./types"

// Components
import { HeaderLink, NameInput, AddressInput, OwnerInfoInputs, DeleteRespondentBtn } from "./components"

function UpdateRespondentForm({ index }: UpdateRespondentFormProps) {

  return (
    <div className="flex flex-col bg-neutral/50 p-4 lg:p-10">

      <HeaderLink index={index} />

      <div className={styles.body}>

        <div className="flex gap-4 flex-wrap">
          <NameInput index={index} />
          <AddressInput index={index} />
        </div>

        <OwnerInfoInputs index={index} />

      </div>

      <DeleteRespondentBtn index={index} />
      
    </div>
  )
}

export default UpdateRespondentForm