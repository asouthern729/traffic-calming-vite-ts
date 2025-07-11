import { useCreatePetitionFormCtx } from './hooks'
import styles from '@/components/form-elements/Forms.module.css'

// Components
import FormLabel from '@/components/form-elements/FormLabel'
import FormError from '@/components/form-elements/FormError'

export const DescriptionInput = () => { // Petition description input
  const { register, formState: { errors } } = useCreatePetitionFormCtx()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <FormLabel 
          name={'description'}
          required={true}>
            Description:
        </FormLabel>
        <textarea 
          className={styles.input}
          rows={6}
          { ...register('description', {
            required: 'Description is required',
            maxLength: {
              value: 2000,
              message: 'Description must be 2000 characters or less'
            }
          }) } />
      </div>
      <FormError error={errors.description?.message} />
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

const StartDateInput = () => { // Petition start date input
  const { register, setValue } = useCreatePetitionFormCtx()

  return (
    <div className="flex-1 flex">
      <FormLabel
        name={'startDate'}
        required={true}>
          Start Date:
      </FormLabel>
      <input 
        type="date"
        className={styles.input}
        { ...register('startDate', {
          required: 'Petition start date is required',
          onChange: event => {
            const startDate = new Date(event.target.value)
            const endDate = new Date(startDate.setDate(startDate.getDate() + 90)).toISOString().split('T')[0]
            setValue('endDate', endDate, { shouldValidate: true, shouldDirty: true })
          }
        }) } />
    </div>
  )
}

const EndDateInput = () => { // Petition end date input
  const { register } = useCreatePetitionFormCtx()

  return (
    <div className="flex-1 flex">
      <FormLabel
        name={'endDate'}
        required={true}>
          End Date:
      </FormLabel>
      <input 
        type="date"
        className={styles.input}
        { ...register('endDate', {
          required: 'Petition end date is required'
        }) } />
    </div>
  )
}