import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import icon from '../../../../assets/icons/cof/cof.png'
import { useValidateRespondentForm, handleValidateRespondentFormSubmit } from '.'
import styles from '../../Forms.module.css'

// Components
import FormLabel from '../../FormLabel/FormLabel'
import FormError from '../../FormError/FormError'
import SubmitBtn from '../../../buttons/forms/SubmitBtn/SubmitBtn'

function ValidateRespondentForm() {
  const methods = useValidateRespondentForm()

  const navigate = useNavigate()

  return (
    <div className="p-6 bg-secondary/10 rounded lg:p-10 lg:pt-6">
      <FormProvider { ...methods }>
        <form className={styles.body} onSubmit={methods.handleSubmit(formData => handleValidateRespondentFormSubmit(formData, { navigate: () => navigate(`/respondent?shortId=${ formData.shortId }`) }))}>
            <img src={icon} alt="cof icon" className="m-auto w-28 lg:w-32" />
            <div className={styles.note}>Please enter the 5 character respondent ID listed on your traffic calming petition mailer:</div>
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

            <SubmitBtn
              handleClick={() => null}
              disabled={!methods.formState.isValid} />

        </form>
      </FormProvider>
    </div>
  )
}

export default ValidateRespondentForm