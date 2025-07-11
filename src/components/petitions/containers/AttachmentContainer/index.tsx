// Components
import * as Components from './components'

function AttachmentContainer() {

  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <span className="text-neutral-content text-xl">Attachment:</span>
      <Components.SetAttachment />
    </div>
  )
}

export default AttachmentContainer