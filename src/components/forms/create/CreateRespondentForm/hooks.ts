import { useFormContext } from "react-hook-form"

// Types
import { UseFormReturn } from "react-hook-form"
import { UpdatePetitionFormUseForm } from "../../update/UpdatePetitionForm/types"

export const useCreateRespondentFormContext = (): { methods: UseFormReturn<UpdatePetitionFormUseForm> } => { // CreateRespondentForm context
  const methods = useFormContext<UpdatePetitionFormUseForm>()

  return { methods }
}