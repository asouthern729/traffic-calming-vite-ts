import { FormProvider } from "react-hook-form"
import { useCreatePetitionForm, useOnCancelBtnClick, useHandleFormSubmit } from "./hooks"
import styles from '@/components/form-elements/Forms.module.css'

// Components
import AttachmentContainer from "@/components/petitions/containers/AttachmentContainer"
import RespondentsContainer from "@/components/petitions/containers/RespondentsContainer"
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as Components from './components'

function CreatePetitionForm() {
  const methods = useCreatePetitionForm()

  const onCancelBtnClick = useOnCancelBtnClick()

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <FormProvider { ...methods }>
      <form data-testid="create-petition-form" className={styles.body} onSubmit={methods.handleSubmit(formData => handleFormSubmit(formData))}>
        <h2 className={styles.title}>Create Petition</h2>

        <Components.DescriptionInput />
        <Components.DateInputs />

        <div className="my-12">
          <AttachmentContainer /> 
        </div>
        
        <RespondentsContainer />

        <FormBtns onCancelBtnClick={onCancelBtnClick} />
      </form>
    </FormProvider>
  )
}

export default CreatePetitionForm