import { useCreatePetitionFormCtx } from "@/components/petitions/forms/create/CreatePetitionForm/hooks"
import { useHandleDeleteAttachmentBtn } from "./hooks"

// Components
import NewAttachment from "../../../attachments/NewAttachment"
import ExistingAttachment from "../../../attachments/ExistingAttachment"

export const SetAttachment = () => {
  const { getValues } = useCreatePetitionFormCtx()

  const attachment = getValues('Attachment')

  if(!attachment || attachment instanceof File) { // New attachment
    return (
      <div className="flex flex-col gap-1 items-center w-full">
        <NewAttachment />
        <DeleteAttachmentBtn />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1 items-center w-full">
      <ExistingAttachment />
      <DeleteAttachmentBtn />
    </div>
  )
}

const DeleteAttachmentBtn = () => {
  const { onClick, label, visible } = useHandleDeleteAttachmentBtn()

  if(!visible) return null

  return (
    <button 
      type="button"
      className="font-[play] uppercase text-error hover:cursor-pointer"
      onClick={onClick}>
        {label}
    </button>
  )
}