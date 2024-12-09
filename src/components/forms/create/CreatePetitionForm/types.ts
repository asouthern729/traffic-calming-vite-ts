// Types
import { FieldArrayWithId, UseFormReturn } from "react-hook-form"
import { CreateRespondentFormUseForm } from "../CreateRespondentForm/types"

export interface CreatePetitionFormProps { // CreatePetitionForm props
  handleCancelBtnClick: () => void
}

export interface CreatePetitionFormUseForm { // CreatePetitionForm useForm
  description: string
  startDate: string
  endDate: string
  newRespondents: CreateRespondentFormUseForm[]
  attachment: File | null
  uuid: string
}

export interface UseCreatePetitionFormReturn { // useCreatePetitionForm hook return
  methods: UseFormReturn<CreatePetitionFormUseForm>
  newRespondents: FieldArrayWithId<CreatePetitionFormUseForm, 'newRespondents', "id">[]
}

export interface HandleSubmitCreatePetitionFormProps { // handleSubmitCreatePetitionForm fn props
  formData: CreatePetitionFormUseForm
  options: {
    navigate: () => void
  }
}