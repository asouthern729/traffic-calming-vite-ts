import { FormProvider } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { setFormLabelProps } from "../../FormLabel"
import { useCreatePetitionForm, handleSubmitCreatePetitionForm } from "."
import styles from '../../Forms.module.css'

// Types
import { CreatePetitionFormProps } from './types'

// Components
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"
import AttachmentContainer from "../../../containers/AttachmentContainer/AttachmentContainer"
import RespondentsContainer from "../../../containers/RespondentsContainer/RespondentsContainer"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"

function CreatePetitionForm({ handleCancelBtnClick }: CreatePetitionFormProps) {
  const { methods, newRespondents } = useCreatePetitionForm()

  const navigate = useNavigate()

  return (
    <>
      <FormProvider { ...methods }>
        <form data-testid="create-petition-form" className={styles.body} onSubmit={methods.handleSubmit(formData => handleSubmitCreatePetitionForm(formData, { navigate: () => navigate('/staff') }))}>

          <div className={styles.title}>Create Petition</div>

          <div className={styles.inputSection}>
            <div className="flex">
              <FormLabel { ...setFormLabelProps({ label: 'Description:', name: 'description', required: true }) } />
              <textarea 
                className={styles.input}
                rows={6}
                { ...methods.register('description', {
                  required: 'Description is required',
                  maxLength: {
                    value: 2000,
                    message: 'Description must be 2000 characters or less'
                  },
                  onBlur: () => methods.trigger('description')
                }) } />
            </div>
            <FormError field={'description'} />
          </div>

          <div className="flex gap-4 w-full flex-wrap lg:">
            <div className="flex-1 flex">
              <FormLabel { ...setFormLabelProps({ label: 'Start Date:', name:'startDate', required: true }) } />
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

            <div className="flex-1 flex">
              <FormLabel { ...setFormLabelProps({ label: 'End Date:', name: 'endDate', required: true }) } />
              <input 
                type="date"
                className={styles.input}
                { ...methods.register('endDate', {
                  required: 'Petition end date is required',
                  onBlur: () => methods.trigger('endDate')
                }) } />
            </div>
          </div>

          <div className="pt-12">
            <AttachmentContainer /> 
          </div>
          
          <div className="flex flex-col gap-10 py-10">
            <RespondentsContainer 
              respondents={[]}
              newRespondents={newRespondents} />
          </div>

          <div className={styles.buttonsContainer}>
            <CancelBtn handleClick={handleCancelBtnClick} />
            <SaveBtn disabled={!methods.formState.isValid || methods.formState.isSubmitting} />
          </div>

        </form>
      </FormProvider>
    </>
  )
}

export default CreatePetitionForm