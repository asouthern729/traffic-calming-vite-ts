import { handleSuccessfulFormSubmit } from "../../../../helpers"
import { createPetition, createRespondents, createAttachment } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { PetitionObj, RespondentObj } from "../../../../context/App/types"
import { HandleSubmitCreatePetitionFormProps } from './types'

export const handleSubmitCreatePetitionForm = async (formData: HandleSubmitCreatePetitionFormProps['formData'], options: HandleSubmitCreatePetitionFormProps['options']): Promise<void> => { // Handle form submit
  const { navigate } = options

  const petitionObj: PetitionObj = {
    description: formData.description,
    startDate: formData.startDate,
    endDate: formData.endDate
  }

  const result = await createPetition(petitionObj)

  if(result.success) {
    if(formData.attachment) { // Handle attachment upload
      const attachmentForm = new FormData()

      attachmentForm.append("file", formData.attachment)
      attachmentForm.append("parentId", result.data.uuid)

      const attachmentResult = await createAttachment(attachmentForm)

      if(!attachmentResult.success) {
        errorPopup(attachmentResult.msg || 'Something Went Wrong')
      }
    }

    const newRespondentsArray = formData.newRespondents.map(respondent => {
      const obj: RespondentObj = {
        name: respondent.name,
        address: respondent.address,
        ownerAddress: respondent.ownerAddress,
        ownerCity: respondent.ownerCity,
        ownerState: respondent.ownerState,
        ownerZIP: respondent.ownerZIP,
        parentId: result.data.uuid
      }

      return obj
    })
    
    const newRespondentsResult = await createRespondents(newRespondentsArray)

    if(!newRespondentsResult.success) {
      errorPopup(newRespondentsResult.msg || 'Error Creating Respondents')
    }

    handleSuccessfulFormSubmit(result.msg as string, { navigate })
  } else errorPopup(result.msg || 'Something Went Wrong')
}