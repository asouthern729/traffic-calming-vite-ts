import { useCreatePetitionFormContext } from "./hooks"
import styles from '../../Forms.module.css'

// Components
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"

export const DescriptionInput = () => { // Petition description input
  const { methods } = useCreatePetitionFormContext()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <FormLabel 
          label={'Description'}
          name={'description'}
          required={true} />
        <textarea 
          className={styles.input}
          rows={6}
          { ...methods.register('description', {
            required: 'Description is required',
            maxLength: {
              value: 2000,
              message: 'Description must be 2000 characters or less'
            },
            onBlur: () => methods.trigger('description'),
            onChange: () => methods.trigger('description')
          }) } />
      </div>
      <FormError field={'description'} />
    </div>
  )
}

export const DateInputs = () => { // Petition start and end date inputs

  return (
    <div className="flex gap-4 w-full flex-wrap">
      <StartDateInput />
      <EndDateInput />
    </div>
  )
}

export const Buttons = ({ handleCancelBtnClick }: { handleCancelBtnClick: () => void }) => { // Form buttons
  const { methods } = useCreatePetitionFormContext()
  
  return (
    <div className={styles.buttonsContainer}>
      <CancelBtn handleClick={handleCancelBtnClick} />
      <SaveBtn disabled={!methods.formState.isValid || methods.formState.isSubmitting} />
    </div>
  )
}

const StartDateInput = () => { // Petition start date input
  const { methods } = useCreatePetitionFormContext()

  return (
    <div className="flex-1 flex">
      <FormLabel
        label={'Start Date:'}
        name={'startDate'}
        required={true} />
      <input 
        type="date"
        className={styles.input}
        { ...methods.register('startDate', {
          required: 'Petition start date is required',
          onBlur: () => methods.trigger('startDate'),
          onChange: () => {
            const startDate = new Date(methods.watch('startDate'))
            const endDate = new Date(startDate.setDate(startDate.getDate() + 90)).toISOString().split('T')[0]
            methods.setValue('endDate', endDate)
          }
        }) } />
    </div>
  )
}

const EndDateInput = () => { // Petition end date input
  const { methods } = useCreatePetitionFormContext()

  return (
    <div className="flex-1 flex">
      <FormLabel
        label={'End Date:'}
        name={'endDate'}
        required={true} />
      <input 
        type="date"
        className={styles.input}
        { ...methods.register('endDate', {
          required: 'Petition end date is required',
          onBlur: () => methods.trigger('endDate')
        }) } />
    </div>
  )
}