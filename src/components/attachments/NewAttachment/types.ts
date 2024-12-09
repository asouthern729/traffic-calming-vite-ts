// Types
import { Dispatch, SetStateAction } from "react"
import { AttachmentContainerState } from "../../containers/AttachmentContainer/types"

export interface NewAttachmentProps { // NewAttachment props
  label: string
  setState: Dispatch<SetStateAction<AttachmentContainerState>>
}

export interface UseSetOnNewAttachmentDropProps { // useSEtOnNewAttachmentDrop hook props
  setState: Dispatch<SetStateAction<AttachmentContainerState>>
}