import { useFormContext } from "react-hook-form"
import { setFormLabelProps } from "../../FormLabel"
import { handleRemoveNewRespondent } from "."
import styles from '../../Forms.module.css'

// Types
import { StateAbbreviations } from "../../update/UpdateRespondentForm/types"
import { UpdatePetitionFormUseForm } from "../../update/UpdatePetitionForm/types"
import { CreateRespondentFormProps } from "./types"

// Components
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"

function CreateRespondentForm({ index }: CreateRespondentFormProps) {
  const methods = useFormContext<UpdatePetitionFormUseForm>()

  return (
    <div className="flex flex-col bg-success/20 p-4 lg:p-10">
      
      <div className="flex justify-between font-bold pb-2">
        <div className="text-neutral-content uppercase">New Respondent</div>
        <button 
          type="button"
          className="text-warning uppercase"
          onClick={() => handleRemoveNewRespondent(methods, index)}>
            Remove
        </button>
      </div>

      <div className={styles.body}>

        <div className="flex gap-4 flex-wrap">

          <div className={styles.inputSection}>
            <div className="flex">
              <FormLabel { ...setFormLabelProps({ label: 'Name:', name: `newRespondents.${ index }.name` }) } />
              <input 
                type="text"
                className={styles.input}
                { ...methods.register(`newRespondents.${ index }.name`, {
                  maxLength: {
                    value: 255,
                    message: 'Name must be 255 characters or less'
                  }
                }) } />
            </div>
            <FormError field={`newRespondents.${ index }.name`} />
          </div>

          <div className={styles.inputSection}>
            <div className="flex">
              <FormLabel { ...setFormLabelProps({ label: 'Address:', name: `newRespondents.${ index }.address`, required: true }) } />
              <input 
                type="text"
                className={styles.input}
                { ...methods.register(`newRespondents.${ index }.address`, {
                  required: 'Address is required',
                  maxLength: {
                    value: 255,
                    message: 'Address must be 255 characters or less'
                  },
                  onBlur: () => methods.trigger(`newRespondents.${ index }.address`)
                }) } />
            </div>
            <FormError field={`newRespondents.${ index }.address`} />
          </div>

        </div>

        <div className="flex gap-3 flex-wrap">

          <div className="flex-1 flex flex-col gap-2">
            <div className="flex">
              <FormLabel { ...setFormLabelProps({ label: 'Owner Address:', name: `newRespondents.${ index }.ownerAddress` }) } />
              <input 
                type="text"
                className={styles.input}
                { ...methods.register(`newRespondents.${ index }.ownerAddress`, {
                  maxLength: {
                    value: 255,
                    message: 'Owner address must be 255 characters or less'
                  }
                }) } />
            </div>
            <FormError field={`newRespondents.${ index }.ownerAddress`} />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <div className="flex">
              <FormLabel { ...setFormLabelProps({ label: 'Owner City', name: `newRespondents.${ index }.ownerCity` }) } />
              <input 
                type="text"
                className={styles.input}
                { ...methods.register(`newRespondents.${ index }.ownerCity`, {
                  maxLength: {
                    value: 50,
                    message: 'Owner city must be 50 characters or less'
                  }
                }) } />
            </div>
            <FormError field={`newRespondents.${ index }.ownerCity`} />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <div className="flex">
              <FormLabel { ...setFormLabelProps({ label: 'Owner State:', name: `newRespondents.${ index }.ownerState` }) } />
              <select 
                className={styles.input}
                { ...methods.register(`newRespondents.${ index }.ownerState`) }>
                  <option value=""></option>
                  {Object.values(StateAbbreviations).map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <div className="flex">
              <FormLabel { ...setFormLabelProps({ label: 'Owner ZIP:', name: `newRespondents.${ index }.ownerZIP` }) } />
              <input 
                type="text"
                className={styles.input}
                { ...methods.register(`newRespondents.${ index }.ownerZIP`, {
                  maxLength: {
                    value: 5,
                    message: 'Owner ZIP must be 5 characters'
                  },
                  minLength: {
                    value: 5,
                    message: 'Owner ZIP must be 5 characters'
                  }
                }) } />
            </div>
            <FormError field={`newRespondents.${ index }.ownerZIP`} />
          </div>

        </div>

      </div>
      
    </div>
  )
}

export default CreateRespondentForm