// Types
import { Dispatch, SetStateAction } from "react"
import { UseFormReturn, FieldArrayWithId, UseFieldArrayRemove, UseFieldArrayAppend } from "react-hook-form"
import { Petition } from "../../../../context/App/types"
import { CreateRespondentFormUseForm } from "../../create/CreateRespondentForm/types"
import { UpdateRespondentFormUseForm } from "../UpdateRespondentForm/types"

export interface UpdatePetitionFormProps { // UpdatePetititonForm props
  petition: Petition
  handleCancelBtnClick: () => void
}

export interface UpdatePetitionFormState { // UpdatePetitionForm state obj
  deleteBtnActive: boolean
}

export interface UpdatePetitionFormUseForm { // UpdatePetitionForm useForm
  readonly petitionId: string
  description: string
  startDate: string
  endDate: string
  respondents: UpdateRespondentFormUseForm[]
  newRespondents: CreateRespondentFormUseForm[]
  readonly uuid: string
}

export interface UseUpdatePetitionFormUseFormProps { // useUpdatePetitionForm hook props
  petition: Petition
}

export interface UseUpdatePetitionFormReturn {
  methods: UseFormReturn<UpdatePetitionFormUseForm>
  respondents: FieldArrayWithId<UpdatePetitionFormUseForm, "respondents", "id">[]
  newRespondents: FieldArrayWithId<UpdatePetitionFormUseForm, "newRespondents", "id">[]
  removeRespondent: UseFieldArrayRemove
  appendRespondent: UseFieldArrayAppend<UpdatePetitionFormUseForm, "respondents">
}

export interface HandleUpdatePetitionFormSubmitProps { // handleUpdatePetitionFormSubmit fn props
  formData: UpdatePetitionFormUseForm
  dirtyRespondents: number[]
  options: {
    navigate: () => void
    invalidateQuery: () => Promise<void>
  }
}

export interface SetDeleteBtnProps { // setDeleteBtn fn props
  deleteBtnActive: boolean
  setState: Dispatch<SetStateAction<UpdatePetitionFormState>>
  uuid: string
  options: {
    navigate: () => void
  }
}