import { useCreateRespondentFormContext } from "./hooks"
import { handleRemoveNewRespondent } from "./utils"
import styles from '../../Forms.module.css'

// Types
import { StateAbbreviations } from "../../update/UpdateRespondentForm/types"

// Components
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"

export const RemoveBtn = ({ index }: { index: number }) => { // Remove petition respondent button
  const { methods } = useCreateRespondentFormContext()

  return (
    <div className="flex justify-between font-bold pb-2">
      <div className="text-neutral-content uppercase">New Respondent</div>
      <button 
        type="button"
        className="text-warning uppercase"
        onClick={() => handleRemoveNewRespondent(methods, index)}>
          Remove
      </button>
    </div>
  )
}

export const NameInput = ({ index }: { index: number }) => { // Name input
  const { methods } = useCreateRespondentFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Name:'}
          name={`newRespondents.${ index }.name`} />
        <input 
          type="text"
          className={styles.input}
          { ...methods.register(`newRespondents.${ index }.name`, {
            maxLength: {
              value: 255,
              message: 'Name must be 255 characters or less'
            },
            onChange: () => methods.trigger(`newRespondents.${ index }.name`)
          }) } />
      </div>
      <FormError field={`newRespondents.${ index }.name`} />
    </div>
  )
}

export const AddressInput = ({ index }: { index: number }) => { // Address input
  const { methods } = useCreateRespondentFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Address:'}
          name={`newRespondents.${ index }.address`}
          required={true} />
        <input 
          type="text"
          className={styles.input}
          { ...methods.register(`newRespondents.${ index }.address`, {
            required: 'Address is required',
            maxLength: {
              value: 255,
              message: 'Address must be 255 characters or less'
            },
            onBlur: () => methods.trigger(`newRespondents.${ index }.address`),
            onChange: () => methods.trigger(`newRespondents.${ index }.address`)
          }) } />
      </div>
      <FormError field={`newRespondents.${ index }.address`} />
    </div>
  )
}

export const OwnerInfoInputs = ({ index }: { index: number }) => { // Owner info inputs
  
  return (
    <div className="flex gap-3 flex-wrap">
      <OwnerAddressInput index={index} />
      <OwnerCityInput index={index} />
      <OwnerStateInput index={index} />
      <OwnerZIPInput index={index} />
    </div>
  )
}

const OwnerAddressInput = ({ index }: { index: number }) => { // Owner address input
  const { methods } = useCreateRespondentFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Owner Address:'}
          name={`newRespondents.${ index }.ownerAddress`} />
        <input 
          type="text"
          className={styles.input}
          { ...methods.register(`newRespondents.${ index }.ownerAddress`, {
            maxLength: {
              value: 255,
              message: 'Owner address must be 255 characters or less'
            },
            onChange: () => methods.trigger(`newRespondents.${ index }.ownerAddress`)
          }) } />
      </div>
      <FormError field={`newRespondents.${ index }.ownerAddress`} />
    </div>
  )
}

const OwnerCityInput = ({ index }: { index: number }) => { // Owner city input
  const { methods } = useCreateRespondentFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Owner City:'}
          name={`newRespondents.${ index }.ownerCity`} />
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
  )
}

const OwnerStateInput = ({ index }: { index: number }) => { // Owner state input
  const { methods } = useCreateRespondentFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Owner State:'}
          name={`newRespondents.${ index }.ownerState`} />
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
  )
}

const OwnerZIPInput = ({ index }: { index: number }) => { // Owner ZIP input
  const { methods } = useCreateRespondentFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Owner ZIP:'}
          name={`newRespondents.${ index }.ownerZIP`} />
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
            },
            onChange: () => methods.trigger(`newRespondents.${ index }.ownerZIP`)
          }) } />
      </div>
      <FormError field={`newRespondents.${ index }.ownerZIP`} />
    </div>
  )
}