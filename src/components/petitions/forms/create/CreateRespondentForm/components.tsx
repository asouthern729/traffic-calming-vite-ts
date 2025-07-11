import { Controller } from "react-hook-form"
import { useCreatePetitionFormCtx } from "../CreatePetitionForm/hooks" 
import { useHandleRemoveRespondent } from "./hooks"
import styles from '@/components/form-elements/Forms.module.css'

// Types
import { StateAbbreviations } from "../../update/UpdateRespondentForm/types"

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"

export const RemoveBtn = ({ index }: { index: number }) => { // Remove petition respondent button
  const onClick = useHandleRemoveRespondent(index)

  return (
    <div className="flex justify-between font-bold pb-2">
      <div className="text-neutral-content uppercase">New Respondent</div>
      <button 
        type="button"
        className="text-warning uppercase hover:cursor-pointer"
        onClick={onClick}>
          Remove
      </button>
    </div>
  )
}

export const NameInput = ({ index }: { index: number }) => { // Name input
  const { control } = useCreatePetitionFormCtx()

  return (
    <Controller
      control={control}
      name={`Respondents.${ index }.name`}
      rules={{
        maxLength: {
          value: 255,
          message: 'Name must be 255 characters or less'
        }
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel name={field.name}>
              Name:
            </FormLabel>
            <input 
              type="text"
              className={styles.input}
              { ...field }
              value={field.value ?? ''} />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}

export const AddressInput = ({ index }: { index: number }) => { // Address input
  const { control } = useCreatePetitionFormCtx()

  return (
    <Controller
      control={control}
      name={`Respondents.${ index }.address`}
      rules={{
        required: 'Address is required',
        maxLength: {
          value: 255,
          message: 'Address must be 255 characters or less'
        }
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel
              name={field.name}
              required={true}>
                Address:
            </FormLabel>
            <input 
              type="text"
              className={styles.input}
              { ...field } />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
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
  const { control } = useCreatePetitionFormCtx()

  return (
    <Controller
      control={control}
      name={`Respondents.${ index }.ownerAddress`}
      rules={{
        maxLength: {
          value: 255,
          message: 'Owner address must be 255 characters or less'
        }
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel name={field.name}>
              Owner Address:
            </FormLabel>
            <input 
              type="text"
              className={styles.input}
              { ...field }
              value={field.value ?? ''} />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}

const OwnerCityInput = ({ index }: { index: number }) => { // Owner city input
  const { control } = useCreatePetitionFormCtx()

  return (
    <Controller
      control={control}
      name={`Respondents.${ index }.ownerCity`}
      rules={{
        maxLength: {
          value: 50,
          message: 'Owner city must be 50 characters or less'
        }
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel name={field.name}>
              Owner City:
            </FormLabel>
            <input 
              type="text"
              className={styles.input}
              { ...field }
              value={field.value ?? ''} />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}

const OwnerStateInput = ({ index }: { index: number }) => { // Owner state input
  const { control } = useCreatePetitionFormCtx()

  return (
    <Controller
      control={control}
      name={`Respondents.${ index }.ownerState`}
      render={({ field }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel name={field.name}>
              Owner State:
            </FormLabel>
            <select 
              className={styles.input}>
                <option value=""></option>
                {Object.values(StateAbbreviations).map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
            </select>
          </div>
        </div>
      )} />
  )
}

const OwnerZIPInput = ({ index }: { index: number }) => { // Owner ZIP input
  const { control } = useCreatePetitionFormCtx()

  return (
    <Controller
      control={control}
      name={`Respondents.${ index }.ownerZIP`}
      rules={{
        minLength: {
          value: 5,
          message: 'Owner ZIP must be 5 characters'
        },
        maxLength: {
          value: 5,
          message: 'Owner ZIP must be 5 characters'
        }
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel name={field.name}>
              Owner ZIP:
            </FormLabel>
            <input 
              type="text"
              className={styles.input}
              { ...field }
              value={field.value ?? ''} />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}