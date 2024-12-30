import { createRespondents, deletePetition, updatePetition, updateRespondent, createAttachment } from "../../../../context/App/AppActions"
import { handleSuccessfulFormSubmit } from "../../../../helpers"
import { savedPopup, errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { PetitionObj, RespondentObj } from "../../../../context/App/types"
import { DeleteBtnProps } from "../../../buttons/forms/DeleteBtn/types"
import { HandleUpdatePetitionFormSubmitProps, SetDeleteBtnProps } from "./types"

export const handleUpdatePetitionFormSubmit = async (formData: HandleUpdatePetitionFormSubmitProps['formData'], dirtyRespondents: HandleUpdatePetitionFormSubmitProps['dirtyRespondents'], options: HandleUpdatePetitionFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { navigate, invalidateQuery } = options

  const petitionObj: PetitionObj = {
    description: formData.description,
    startDate: formData.startDate,
    endDate: formData.endDate,
    uuid: formData.uuid
  }

  const result = await updatePetition(petitionObj)

  if(result.success) {
    if(formData.attachment instanceof File) { // Handle file upload
      const attachmentForm = new FormData()

      attachmentForm.append("file", formData.attachment)
      attachmentForm.append("parentId", formData.uuid)

      const attachmentResult = await createAttachment(attachmentForm)

      if(!attachmentResult.success) {
        errorPopup(attachmentResult.msg || 'Something Went Wrong')
      }
    }

    const respondents = formData.respondents

    Promise.all( // Update dirtied existing respondents
      respondents.map((respondent, index) => {
        if(dirtyRespondents.includes(index)) {
          const respondentObj: RespondentObj = {
            name: respondent.name,
            address: respondent.address,
            ownerAddress: respondent.ownerAddress,
            ownerCity: respondent.ownerCity,
            ownerState: respondent.ownerState,
            ownerZIP: respondent.ownerZIP,
            parentId: respondent.parentId,
            uuid: respondent.uuid
          }

          updateRespondent(respondentObj)
        }
      })
    )

    const newRespondentsArray = formData.newRespondents.map(respondent => {
      const obj: RespondentObj = {
        name: respondent.name,
        address: respondent.address,
        ownerAddress: respondent.ownerAddress,
        ownerCity: respondent.ownerCity,
        ownerState: respondent.ownerState,
        ownerZIP: respondent.ownerZIP,
        parentId: formData.uuid
      }

      return obj
    })

    const newRespondentsResult = await createRespondents(newRespondentsArray)

    if(!newRespondentsResult.success) {
      errorPopup(newRespondentsResult.msg || 'Error Creating Respondents')
    }

    handleSuccessfulFormSubmit(result.msg as string, { navigate, invalidateQuery })
  } else errorPopup(result.msg || 'Something Went Wrong')
}

export const setDeleteBtnProps = (deleteBtnActive: SetDeleteBtnProps['deleteBtnActive'], setState: SetDeleteBtnProps['setState'], uuid: SetDeleteBtnProps['uuid'], options: SetDeleteBtnProps['options']): DeleteBtnProps => { // Delete petition button props
  const { navigate } = options

  const props: DeleteBtnProps = {
    label: '',
    handleClick: () => setState(prevState => ({ deleteBtnActive: !prevState.deleteBtnActive })),
    disabled: false
  }

  if(!deleteBtnActive) {
    props.label = 'Delete Petition'
  } else {
    props.label = 'Confirm Delete Petition'
    props.handleClick = async () => {
      const result = await deletePetition(uuid)

      if(result.success) {
        savedPopup(result.msg)
        navigate()
      } else errorPopup(result.msg || 'Something Went Wrong')
    }
  }

  return props
}