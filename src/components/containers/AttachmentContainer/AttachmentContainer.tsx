// Components
import { Attachment } from "./components"

function AttachmentContainer() {

  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <label htmlFor="attachment" className="text-neutral-content text-xl">Attachment:</label>
      <Attachment />
    </div>
  )
}

export default AttachmentContainer