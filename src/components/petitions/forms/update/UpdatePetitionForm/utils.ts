import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'
import { savedPopup, errorPopup } from "@/utils/Toast/Toast"

// Types
import * as AppTypes from '@/context/App/types'

export const handleUpdatePetition = async (formData: AppTypes.PetitionCreateInterface, token: string, dirtyRespondents: string[]) => {
  const result = await AppActions.updatePetition(formData, authHeaders(token))

  if(result.success) {
    if(formData.Attachment && formData.Attachment instanceof File) {
      const attachmentForm = new FormData()

      attachmentForm.append("file", formData.Attachment)
      attachmentForm.append("parentId", formData.uuid as string)

      const upload = await AppActions.createAttachment(attachmentForm, authHeaders(token))

      if(!upload.success) {
        errorPopup(upload.msg)
      }
    }

    await Promise.all( // Update dirtied respondents
      dirtyRespondents.map(uuid => {
        const respondent = formData.Respondents?.find(item => item.uuid === uuid) as AppTypes.RespondentCreateInterface

        AppActions.updateRespondent(respondent, authHeaders(token))
      })
    )

    const newRespondents = formData.Respondents?.filter(respondent => !respondent.uuid).map(item => ({ ...item, parentId: formData.uuid as string })) || []

    await AppActions.createRespondents(newRespondents, authHeaders(token)) // Handle new respondents

    savedPopup(result.msg)
  } else errorPopup(result.msg)
}

export const getDirtyRespondentUuids = (dirtyFields: any, formValues: AppTypes.PetitionCreateInterface): string[] => {
  if(!dirtyFields.Respondents || !formValues.Respondents) {
    return []
  }

  const uuids: string[] = []
  
  dirtyFields.Respondents.forEach((respondent: any, index: number) => {
    if(respondent && Object.keys(respondent).length > 0 && formValues.Respondents) {
      const uuid = formValues.Respondents[index]?.uuid

      if(uuid) {
        uuids.push(uuid)
      }
    }
  })

  return uuids
}