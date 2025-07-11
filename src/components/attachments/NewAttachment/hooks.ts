import { useCallback, useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { useCreatePetitionFormCtx } from "@/components/petitions/forms/create/CreatePetitionForm/hooks"
import { errorPopup } from "../../../utils/Toast/Toast"

// Types
import { FileRejection } from 'react-dropzone'
import * as AppTypes from '@/context/App/types'

export const useSetOnNewAttachmentDrop = () => { // Handle new attachment select
  const { setValue } = useFormContext<AppTypes.PetitionCreateInterface>()
  
  const cb = useCallback(async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if(fileRejections.length) { // On error
      errorPopup('Image and PDF file types only')
    }
    
    if(acceptedFiles.length) {
      setValue('Attachment', acceptedFiles[0], { shouldDirty: true, shouldValidate: true }) // Set attachment to form state
    }
  }, [setValue])

  return cb
}

export const useHandleAttachmentPreview = () => {
  const [state, setState] = useState<{ blobUrl: string | null }>({ blobUrl: null })

  const { watch } = useCreatePetitionFormCtx()

  const attachment = watch('Attachment')

    useEffect(() => {
    if (!attachment) {
      setState({ blobUrl: null })
      return;
    }

    const file = Array.isArray(attachment) ? attachment[0] : attachment

    const url = URL.createObjectURL(file)
    setState({ blobUrl: url })

    return () => URL.revokeObjectURL(url)
  }, [attachment])

  return state.blobUrl
}