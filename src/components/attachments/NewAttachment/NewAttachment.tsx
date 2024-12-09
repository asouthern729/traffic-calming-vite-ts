import { useSetOnNewAttachmentDrop } from '.'

// Types
import { NewAttachmentProps } from './types'

// Components
import Dropzone from '../Dropzone/Dropzone'

function NewAttachment({ label, setState }: NewAttachmentProps) {
  const onDrop = useSetOnNewAttachmentDrop(setState)

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <Dropzone 
        onDrop={onDrop}
        label={label}></Dropzone>
    </div>
  )
}

export default NewAttachment
