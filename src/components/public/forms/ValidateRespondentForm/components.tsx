import { useFormContext } from "react-hook-form"
import styles from '@/components/form-elements/Forms.module.css'

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"

export const ShortIdInput = () => { // ShortID input
  const { register, formState: { errors } } = useFormContext<{ shortId: string }>()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          name={'shortId'}
          required={true}>
            Respondent ID:
        </FormLabel>
        <input 
          type="text"
          placeholder="ex: PGZW2"
          className={styles.input}
          { ...register('shortId', {
            required: 'Respondent ID is required',
            minLength: {
              value: 5,
              message: 'Respondent ID must be 5 characters'
            },
            maxLength: {
              value: 5,
              message: 'Respondent ID must be 5 characters'
            },
          }) } />
      </div>
      <FormError error={errors.shortId?.message} />
    </div>
  )
}

export const SubmitBtn = () => {
  const { formState: { isSubmitting, isValid } } = useFormContext()

  const disabled = isSubmitting || !isValid

  return (
    <button 
      type="submit"
      disabled={disabled}
      className="btn btn-primary uppercase text-lg shadow rounded-none w-full">
        Submit
    </button>
  )
}