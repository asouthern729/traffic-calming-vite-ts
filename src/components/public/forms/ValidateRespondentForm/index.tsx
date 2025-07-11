import { FormProvider } from 'react-hook-form'
import icon from '@/assets/icons/cof/cof.png'
import { useValidateRespondentForm, useHandleFormSubmit } from './hooks'
import styles from '@/components/form-elements/Forms.module.css'

// Components
import * as Components from './components'

function ValidateRespondentForm() {
  const methods = useValidateRespondentForm()

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <div className="p-6 bg-neutral/10 rounded lg:p-10 lg:pt-6">

      <FormProvider { ...methods }>
        <form className={styles.body} onSubmit={methods.handleSubmit(formData => handleFormSubmit(formData))}>
          <img src={icon} alt="cof icon" className="m-auto w-28 lg:w-32" />
          <span className="font-[play] text-neutral-content text-center italic px-2">Please enter the 5 character respondent ID listed on your traffic calming petition mailer:</span>
          <Components.ShortIdInput />
          <Components.SubmitBtn />
        </form>
      </FormProvider>

    </div>
  )
}

export default ValidateRespondentForm