import { deleteAttachment } from '../../../context/App/AppActions'
import { savedPopup, errorPopup } from '../../../utils/Toast/Toast'

// Types
import { PetitionAttachment } from '../../../context/App/types'
import { HandleDeleteBtnClickProps } from './types'

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