import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { useSetExistingAttachment, handleDeleteBtnClick } from "."

// Types
import { CreatePetitionFormUseForm } from "../../forms/create/CreatePetitionForm/types"
import { UpdatePetitionFormUseForm } from "../../forms/update/UpdatePetitionForm/types"
import { AttachmentContainerState } from "./types"

// Components
import NewAttachment from "../../attachments/NewAttachment/NewAttachment"
import ExistingAttachment from "../../attachments/ExistingAttachment/ExistingAttachment"

function AttachmentContainer() {
  const [state, setState] = useState<AttachmentContainerState>({ blobURL: null })

  const methods = useFormContext<CreatePetitionFormUseForm|UpdatePetitionFormUseForm>()

  useSetExistingAttachment(setState)

  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <label htmlFor="attachment" className="text-neutral-content text-xl">Attachment:</label>
      {!state.blobURL ? (
        <NewAttachment 
          label={'Click to select, or drag and drop attachment..'}
          setState={setState} />
      ):(
        <ExistingAttachment
          blobURL={state.blobURL}
          handleDeleteBtn={() => handleDeleteBtnClick(methods)} />
      )} 
    </div>
  )
}

export default AttachmentContainer