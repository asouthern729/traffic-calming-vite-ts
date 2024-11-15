// Types
import { UseFormReturn } from "react-hook-form"
import { UpdatePetitionFormUseForm } from "../../update/UpdatePetitionForm/types"

export interface CreateRespondentFormProps { // CreateRespondentForm props
  index: number
}

export interface CreateRespondentFormUseForm { // CreateRespondentForm useForm
  name: string
  address: string
  ownerAddress: string | null
  ownerCity: string | null
  ownerState: string | null
  ownerZIP: string | null
  parentId: string
  [key: string]: string | null
}

export interface HandleRemoveNewRespondentProps { // handleRemoveNewRespondent fn props
  methods: UseFormReturn<UpdatePetitionFormUseForm>
  index: number
}