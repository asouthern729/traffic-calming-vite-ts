import { useCallback } from "react"
import * as AppActions from '@/context/App/AppActions'
import { useCreatePetitionFormCtx } from "@/components/petitions/forms/create/CreatePetitionForm/hooks"

// Types
import * as AppTypes from '@/context/App/types'

export const useOnAttachmentBtnClick = () => {
  const { getValues } = useCreatePetitionFormCtx()

  const attachment = getValues('Attachment') as AppTypes.AttachmentCreateInterface

  const downloadAttachment = async (uuid: string) => {
    const result = await AppActions.getAttachment(uuid)

    if(result.success) {
      const buffer = result.data.data.data
      const bufferView = new Uint8Array(buffer)
      const type = result.data.fileType === 'jpeg' ? 'image/jpeg' : 'application/pdf'

      const blob = new Blob([bufferView], { type })
      const blobURL = URL.createObjectURL(blob)

      window.open(blobURL, '_blank')
    }
  }

  return useCallback(() => {
    if(attachment.uuid) {
      downloadAttachment(attachment.uuid)
    }
  }, [attachment, downloadAttachment])
}