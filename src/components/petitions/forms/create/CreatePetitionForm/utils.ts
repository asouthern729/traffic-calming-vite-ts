import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

// Types
import * as AppTypes from '@/context/App/types'

export const handleCreatePetition = async (formData: AppTypes.PetitionCreateInterface, token: string) => { // Handle form submit
  const result = await AppActions.createPetition(formData, authHeaders(token))

  if(result.success) {
    if(formData.Attachment instanceof File) { // Handle attachment upload
      const attachmentForm = new FormData()

      attachmentForm.append("file", formData.Attachment)
      attachmentForm.append("parentId", result.data.uuid)

      const attachmentResult = await AppActions.createAttachment(attachmentForm, authHeaders(token))

      if(!attachmentResult.success) {
        errorPopup(attachmentResult.msg || 'Error Adding Attachment')
      }
    }

    const respondents = formData.Respondents || []

    const newRespondentsArray = respondents.map(item => {
      const respondent: AppTypes.RespondentCreateInterface = {
        name: item.name,
        address: item.address,
        ownerAddress: item.ownerAddress,
        ownerCity: item.ownerCity,
        ownerState: item.ownerState,
        ownerZIP: item.ownerZIP,
        parentId: result.data.uuid
      }

      return respondent
    })
    
    const newRespondentsResult = await AppActions.createRespondents(newRespondentsArray, authHeaders(token))

    if(!newRespondentsResult.success) {
      errorPopup(newRespondentsResult.msg || 'Error Creating Respondents')
    }

    savedPopup(result.msg)
  } else errorPopup(result.msg || 'Something Went Wrong')
}