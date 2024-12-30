import { FormProvider } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useCreatePetitionForm } from "./hooks"
import { handleSubmitCreatePetitionForm } from './utils'
import styles from '../../Forms.module.css'

// Types
import { CreatePetitionFormProps } from './types'

// Components
import AttachmentContainer from "../../../containers/AttachmentContainer/AttachmentContainer"
import RespondentsContainer from "../../../containers/RespondentsContainer/RespondentsContainer"
import { DescriptionInput, DateInputs, Buttons } from "./components"

function CreatePetitionForm({ handleCancelBtnClick }: CreatePetitionFormProps) {
  const { methods, newRespondents } = useCreatePetitionForm()

  const navigate = useNavigate()

  return (
    <FormProvider { ...methods }>
      <form data-testid="create-petition-form" className={styles.body} onSubmit={methods.handleSubmit(formData => handleSubmitCreatePetitionForm(formData, { navigate: () => navigate('/staff') }))}>

        <h1 className={styles.title}>Create Petition</h1>

        <DescriptionInput />
        <DateInputs />

        <div className="pt-12">
          <AttachmentContainer /> 
        </div>
        
        <div className="flex flex-col gap-10 py-10">
          <RespondentsContainer 
            respondents={[]}
            newRespondents={newRespondents} />
        </div>

        <Buttons handleCancelBtnClick={handleCancelBtnClick} />

      </form>
    </FormProvider>
  )
}

export default CreatePetitionForm