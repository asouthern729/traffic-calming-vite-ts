import { FormProvider } from "react-hook-form"
import { useUpdatePetitionForm, useOnCancelBtnClick, useHandleFormSubmit } from "./hooks"
import styles from '@/components/form-elements/Forms.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import AttachmentContainer from "@/components/petitions/containers/AttachmentContainer"
import RespondentsContainer from "@/components/petitions/containers/RespondentsContainer"
import { DescriptionInput, DateInputs } from '@/components/petitions/forms/create/CreatePetitionForm/components'
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as Components from './components'

function UpdatePetitionForm({ petition }: { petition: AppTypes.PetitionInterface }) {
  const methods = useUpdatePetitionForm(petition)

  const onCancelBtnClick = useOnCancelBtnClick()

  const handleFormSubmit = useHandleFormSubmit(methods)

  return (
    <FormProvider { ...methods }>
      <form onSubmit={methods.handleSubmit(formData => handleFormSubmit(formData))} className={styles.body}>
        <h2 className={styles.title}>Update Petition</h2>

        <DescriptionInput />
        <DateInputs />

        <div className="my-12">
          <AttachmentContainer /> 
        </div>
        
        <RespondentsContainer />

        <FormBtns onCancelBtnClick={onCancelBtnClick} />
        <Components.DeletePetitionBtn />

      </form>
    </FormProvider>
  )
}

export default UpdatePetitionForm