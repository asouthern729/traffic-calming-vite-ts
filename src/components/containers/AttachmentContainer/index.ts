import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { getAttachment, deleteAttachment } from '../../../context/App/AppActions'
import { savedPopup, errorPopup } from '../../../utils/Toast/Toast'

// Types
import { UpdatePetitionFormUseForm } from '../../forms/update/UpdatePetitionForm/types'
import { PetitionAttachment } from '../../../context/App/types'
import { UseSetExistingAttachmentProps, HandleDeleteBtnClickProps } from './types'

export const useSetExistingAttachment = async (setState: UseSetExistingAttachmentProps['setState']): Promise<void> => { // Set existing attachment for UpdatePetitionForm
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

export const handleDeleteBtnClick = async (methods: HandleDeleteBtnClickProps['methods']): Promise<void> => { // Handle delete attachment button click
  let attachment = methods.watch('attachment')

  if(attachment) {
    if(!(attachment instanceof File)) { // Delete attachment from server
      attachment = attachment as unknown as PetitionAttachment
      const result = await deleteAttachment(attachment.uuid)
  
      if(!result.success) {
        return errorPopup(result.msg || 'Something Went Wrong')
      }
  
      savedPopup(result.msg)
    }

    return methods.setValue('attachment', null, { shouldDirty: true, shouldValidate: true })
  }
}