import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { useSetExistingAttachment } from "./hooks"
import { handleDeleteBtnClick } from "./utils"

// Types
import { AttachmentContainerState } from "./types"
import { CreatePetitionFormUseForm } from "../../forms/create/CreatePetitionForm/types"
import { UpdatePetitionFormUseForm } from "../../forms/update/UpdatePetitionForm/types"

// Components
import NewAttachment from "../../attachments/NewAttachment/NewAttachment"
import ExistingAttachment from "../../attachments/ExistingAttachment/ExistingAttachment"

export const Attachment = () => { // Attachment
  const [state, setState] = useState<AttachmentContainerState>({ blobURL: null })

  const methods = useFormContext<CreatePetitionFormUseForm|UpdatePetitionFormUseForm>()

  useSetExistingAttachment(setState)

  return (
    <>
      {!state.blobURL ? (
        <NewAttachment 
          label={'Click to select, or drag and drop attachment..'}
          setState={setState} />
      ):(
        <ExistingAttachment
          blobURL={state.blobURL}
          handleDeleteBtn={() => handleDeleteBtnClick(methods)} />
      )}
    </>
  )
}