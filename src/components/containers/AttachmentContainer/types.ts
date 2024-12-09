// Types
import { Dispatch, SetStateAction } from "react"
import { UseFormReturn } from "react-hook-form"
import { CreatePetitionFormUseForm } from "../../forms/create/CreatePetitionForm/types"
import { UpdatePetitionFormUseForm } from "../../forms/update/UpdatePetitionForm/types"

export interface AttachmentContainerState { // AttachmentContainer state
  blobURL: string | null
}

export interface UseSetExistingAttachmentProps { // useSetExistingAttachment hook props
  setState: Dispatch<SetStateAction<AttachmentContainerState>>
}

export interface HandleDeleteBtnClickProps { // handleDeleteBtnClick fn props
  methods: UseFormReturn<CreatePetitionFormUseForm|UpdatePetitionFormUseForm>
}