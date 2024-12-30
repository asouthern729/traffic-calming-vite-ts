import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import icon from '../../../../assets/icons/cof/cof.png'
import { useValidateRespondentForm } from './hooks'
import { handleValidateRespondentFormSubmit } from './utils'
import styles from '../../Forms.module.css'

// Components
import SubmitBtn from '../../../buttons/forms/SubmitBtn/SubmitBtn'
import { ShortIdInput } from './components'

function ValidateRespondentForm() {
  const methods = useValidateRespondentForm()

  const navigate = useNavigate()

  return (
    <div className="p-6 bg-secondary/10 rounded lg:p-10 lg:pt-6">

      <FormProvider { ...methods }>
        <form className={styles.body} onSubmit={methods.handleSubmit(formData => handleValidateRespondentFormSubmit(formData, { navigate: () => navigate(`/respondent?shortId=${ formData.shortId }`) }))}>
          <img src={icon} alt="cof icon" className="m-auto w-28 lg:w-32" />
          <div className={styles.note}>Please enter the 5 character respondent ID listed on your traffic calming petition mailer:</div>
          <ShortIdInput />
          <SubmitBtn
            handleClick={() => null}
            disabled={!methods.formState.isValid} />
        </form>
      </FormProvider>

    </div>
  )
}

export default ValidateRespondentForm