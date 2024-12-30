import { useFormContext } from "react-hook-form"
import styles from '../../Forms.module.css'

// Types
import { ValidateRespondentFormUseForm } from "./types"

// Components
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"

export const ShortIdInput = () => { // ShortID input
  const methods = useFormContext<ValidateRespondentFormUseForm>()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Respondent ID:'}
          name={'shortId'}
          required={true} />
        <input 
          type="text"
          placeholder="ex: PGZW2"
          className={styles.input}
          { ...methods.register('shortId', {
            required: 'Respondent ID is required',
            minLength: {
              value: 5,
              message: 'Respondent ID must be 5 characters'
            },
            maxLength: {
              value: 5,
              message: 'Respondent ID must be 5 characters'
            },
            onBlur: () => methods.trigger('shortId'),
            onChange: () => methods.trigger('shortId')
          }) } />
      </div>
      <FormError field={'shortId'} />
    </div>
  )
}