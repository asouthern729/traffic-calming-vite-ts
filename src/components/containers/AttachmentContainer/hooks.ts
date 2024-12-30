import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { getAttachment } from '../../../context/App/AppActions'

// Types
import { UpdatePetitionFormUseForm } from '../../forms/update/UpdatePetitionForm/types'
import { PetitionAttachment } from '../../../context/App/types'
import { UseSetExistingAttachmentProps } from './types'

export const useSetExistingAttachment = (setState: UseSetExistingAttachmentProps['setState']): void => { // Set existing attachment for UpdatePetitionForm
  const methods = useFormContext<UpdatePetitionFormUseForm>()

  let attachment = methods.watch('attachment')

  const cb = useCallback(async () => {
    if(attachment) {
      if(!(attachment instanceof File)) { // Existing attachment in form state
        attachment = attachment as unknown as PetitionAttachment
        const result = await getAttachment(attachment.uuid)
    
        if(result.success) {
          const buffer = result.data.data.data
          const bufferView = new Uint8Array(buffer)
          const type = result.data.fileType === 'jpeg' ? 'image/jpeg' : 'application/pdf'
      
          const blob = new Blob([bufferView], { type })
          const blobURL = URL.createObjectURL(blob)
      
          setState({ blobURL })
        }
      }
    } else setState({ blobURL: null })
    
  }, [attachment])

  useEffect(() => {
    cb()
  }, [cb])
}