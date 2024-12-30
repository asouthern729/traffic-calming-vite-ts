// Types
import { Dispatch, SetStateAction } from 'react'
import { UpdateRespondentFormUseForm } from '../components/forms/update/UpdateRespondentForm/types'
import { AttachmentContainerState } from '../components/containers/AttachmentContainer/types'
import { ServerResponse } from '../context/App/types'

export interface HandleSuccessfulFormSubmitProps { // handleSuccessfulFormSubmit fn props
  msg: string
  options: {
    invalidateQuery?: () => Promise<void>
    navigate?: () => void
    resetState?: () => void
  }
}

export interface HandleDeleteBtnClickProps { // handleDeleteBtn fn props
  uuid: string
  deleteBtnActive: boolean
  deleteFn: (uuid: string) => Promise<ServerResponse>
  options: {
    invalidateQuery: () => Promise<void>
    setFormState: () => void
    setState?: Dispatch<SetStateAction<{ deleteBtnActive: boolean }>>
    resetState?: () => void
  }
}

export interface UseHandlePageData { // useHandlePageData hook props
  data: UpdateRespondentFormUseForm[]
  currentPage: number
}

export interface SetBlobURLProps { // setBlobURL fn props
  buffer: ArrayBuffer
  type: string
  options: {
    setState: Dispatch<SetStateAction<AttachmentContainerState>>
  }
}