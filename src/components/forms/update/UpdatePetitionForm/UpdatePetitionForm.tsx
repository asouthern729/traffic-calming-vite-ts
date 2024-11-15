import { useState } from "react"
import { FormProvider } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "react-query"
import { setFormLabelProps } from "../../FormLabel"
import { useUpdatePetitionForm, handleUpdatePetitionFormSubmit, setDeleteBtnProps } from "."
import styles from '../../Forms.module.css'

// Types
import { UpdatePetitionFormProps, UpdatePetitionFormState } from "./types"

// Components
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"
import RespondentsContainer from "../../../containers/RespondentsContainer/RespondentsContainer"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"
import DeleteBtn from "../../../buttons/forms/DeleteBtn/DeleteBtn"

function UpdatePetitionForm({ petition, handleCancelBtnClick }: UpdatePetitionFormProps) {
  const [state, setState] = useState<UpdatePetitionFormState>({ deleteBtnActive: false })

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { methods, respondents, newRespondents } = useUpdatePetitionForm(petition)

  const dirtyRespondents = methods.formState.dirtyFields.respondents ? Object.keys(methods.formState.dirtyFields.respondents).map(key => Number(key)) : []

  return (
    <>
      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => handleUpdatePetitionFormSubmit(formData, dirtyRespondents, { navigate: () => navigate('/staff'), invalidateQuery: () => queryClient.invalidateQueries(['getPetition', petition.uuid]) }))} className={styles.body}>

          <div className={styles.title}>Update Petition</div>

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

          <div className="flex gap-4 w-full flex-wrap">
            <div className="flex-1 flex">
              <FormLabel { ...setFormLabelProps({ label: 'Start Date:', name: 'startDate', required: true }) } />
              <input 
                type="date"
                className={styles.input}
                { ...methods.register('startDate', {
                  required: 'Petition start date is required',
                  onBlur: () => methods.trigger('startDate')
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
          
          <div className="flex flex-col gap-10 py-10">
            <RespondentsContainer
              key={`respondents-container-${ respondents.length }`} // Rerender on respondents.length change to update form child components
              respondents={respondents}
              newRespondents={newRespondents} />
          </div>

          <div className={styles.buttonsContainer}>
            <CancelBtn handleClick={handleCancelBtnClick} />
            <SaveBtn disabled={!methods.formState.isValid || methods.formState.isSubmitting} />
          </div>

          <div className="mx-auto py-10">
            <DeleteBtn { ...setDeleteBtnProps(state.deleteBtnActive, setState, petition.uuid, { navigate: () => navigate('/staff') }) } />
          </div>

        </form>
      </FormProvider>
    </>
  )
}

export default UpdatePetitionForm