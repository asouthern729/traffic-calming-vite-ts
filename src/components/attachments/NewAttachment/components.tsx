import { useSetOnNewAttachmentDrop, useHandleAttachmentPreview } from './hooks'
import { useCreatePetitionFormCtx } from '@/components/petitions/forms/create/CreatePetitionForm/hooks'

// Components
import Dropzone from "../Dropzone"

export const DropzoneContainer = () => {
  const { watch } = useCreatePetitionFormCtx()

  const onDrop = useSetOnNewAttachmentDrop()

  const attachment = watch('Attachment')

  if(attachment) return null

  return (
    <Dropzone onDrop={onDrop} />
  )
}

export const AttachmentPreview = () => {
  const blobUrl = useHandleAttachmentPreview()

  if(!blobUrl) return null

  return (
    <button
      type="button"
      onClick={() => window.open(blobUrl, '_blank')}
      className="btn btn-primary font-[play] font-bold uppercase">
        Click To View Attachment
    </button>
  )
}