import { useCallback } from "react"
import { useFormContext } from "react-hook-form"
import { setBlobURL } from "../../../helpers"
import { errorPopup } from "../../../utils/Toast/Toast"

// Types
import { FileRejection } from 'react-dropzone'
import { CreatePetitionFormUseForm } from "../../forms/create/CreatePetitionForm/types"
import { UseSetOnNewAttachmentDropProps } from "./types"

export const useSetOnNewAttachmentDrop = (setState: UseSetOnNewAttachmentDropProps['setState']): (acceptedFiles: File[], fileRejections: FileRejection[]) => Promise<void> => { // Handle new attachment select
  const setValue = useFormContext<CreatePetitionFormUseForm>().setValue
  
  const cb = useCallback(async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if(fileRejections.length) { // On error
      errorPopup('Image and PDF file types only')
    }
    
    if(acceptedFiles.length) {
      const buffer = await acceptedFiles[0].arrayBuffer()
      const type = acceptedFiles[0].type
  
      setBlobURL(buffer, type, { setState }) // Set blobURL to component state
      setValue('attachment', acceptedFiles[0], { shouldDirty: true, shouldValidate: true }) // Set attachment to form state
    }
  }, [setValue])

  return cb
} 