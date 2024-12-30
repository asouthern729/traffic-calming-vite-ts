import { useCallback, useEffect } from "react"
import { useForm, useFormContext } from "react-hook-form"
import { getAttachment } from "../../../../context/App/AppActions"

// Types
import { UseFormReturn } from "react-hook-form"
import { UseCreateResponseFormProps, CreateResponseFormUseForm, UseGetAttachmentProps } from './types'

export const useCreateResponseForm = (respondent: UseCreateResponseFormProps['respondent']): UseFormReturn<CreateResponseFormUseForm> => { // CreateResponseForm useForm
  return useForm<CreateResponseFormUseForm>({
    defaultValues: {
      response: null,
      parentId: respondent.uuid,
      shortId: respondent.shortId 
    }
  })
}

export const useCreateResponseFormContext = (): { methods: UseFormReturn<CreateResponseFormUseForm> } => { // CreateResponseForm context
  const methods = useFormContext<CreateResponseFormUseForm>()

  return { methods }
}

export const useGetAttachment = (uuid: UseGetAttachmentProps['uuid'], options: UseGetAttachmentProps['options']): void => { // Download attachment - set blobURL to state
  const { setState } = options

  let blobURL: string | undefined

  const cb = useCallback(async () => {
    if(uuid) {
      const result = await getAttachment(uuid)

      if(result.success) {
        const buffer = result.data.data.data
        const bufferView = new Uint8Array(buffer)
        const type = result.data.fileType === 'jpeg' ? 'image/jpeg' : 'application/pdf'

        const blob = new Blob([bufferView], { type })
        blobURL = URL.createObjectURL(blob)

        return setState({ blobURL, type })
      }
    }
  }, [uuid, setState])

  useEffect(() => {
    cb()

    return () => {
      if(blobURL) {
        URL.revokeObjectURL(blobURL)
      }
    }
  }, [cb])
}