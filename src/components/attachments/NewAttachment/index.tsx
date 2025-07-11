// Components
import * as Components from './components'

function NewAttachment() {

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <Components.DropzoneContainer />
      <Components.AttachmentPreview />
    </div>
  )
}

export default NewAttachment
