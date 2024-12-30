import { useState } from "react"
import { FormProvider } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "react-query"
import { useUpdatePetitionForm } from "./hooks"
import { handleUpdatePetitionFormSubmit, setDeleteBtnProps } from './utils'
import styles from '../../Forms.module.css'

// Types
import { UpdatePetitionFormProps, UpdatePetitionFormState } from "./types"

// Components
import AttachmentContainer from "../../../containers/AttachmentContainer/AttachmentContainer"
import RespondentsContainer from "../../../containers/RespondentsContainer/RespondentsContainer"
import DeleteBtn from "../../../buttons/forms/DeleteBtn/DeleteBtn"
import { DescriptionInput, DateInputs, Buttons } from '../../create/CreatePetitionForm/components'

function UpdatePetitionForm({ petition, handleCancelBtnClick }: UpdatePetitionFormProps) {
  const [state, setState] = useState<UpdatePetitionFormState>({ deleteBtnActive: false })

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { methods, respondents, newRespondents } = useUpdatePetitionForm(petition)

  const dirtyRespondents = methods.formState.dirtyFields.respondents ? Object.keys(methods.formState.dirtyFields.respondents).map(key => Number(key)) : []

  return (
    <FormProvider { ...methods }>
      <form onSubmit={methods.handleSubmit(formData => handleUpdatePetitionFormSubmit(formData, dirtyRespondents, { navigate: () => navigate('/staff'), invalidateQuery: () => queryClient.invalidateQueries(['getPetition', petition.uuid]) }))} className={styles.body}>

        <h1 className={styles.title}>Update Petition</h1>

        <DescriptionInput />
        <DateInputs />

        <div className="pt-12">
          <AttachmentContainer /> 
        </div>
        
        <div className="flex flex-col gap-10 py-10">
          <RespondentsContainer
            key={`respondents-container-${ respondents.length }`} // Rerender on respondents.length change to update form child components
            respondents={respondents}
            newRespondents={newRespondents} />
        </div>

        <Buttons handleCancelBtnClick={handleCancelBtnClick} />

        <div className="mx-auto py-10">
          <DeleteBtn { ...setDeleteBtnProps(state.deleteBtnActive, setState, petition.uuid, { navigate: () => navigate('/staff') }) } />
        </div>

      </form>
    </FormProvider>
  )
}

export default UpdatePetitionForm