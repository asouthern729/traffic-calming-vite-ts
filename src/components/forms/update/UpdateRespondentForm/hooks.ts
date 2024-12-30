import { useFormContext } from "react-hook-form"

// Types
import { UseFormReturn } from "react-hook-form"
import { UpdatePetitionFormUseForm } from "../UpdatePetitionForm/types"

export const useUpdateRespondentFormContext = (): { methods: UseFormReturn<UpdatePetitionFormUseForm> } => { // UpdateRespondentForm context
  const methods = useFormContext<UpdatePetitionFormUseForm>()

  return { methods }
}