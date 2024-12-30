import { useForm } from "react-hook-form"

// Types
import { UseFormReturn } from "react-hook-form"
import { ValidateRespondentFormUseForm } from "./types"

export const useValidateRespondentForm = (): UseFormReturn<ValidateRespondentFormUseForm> => { // ValidateRespondentForm useForm
  return useForm<ValidateRespondentFormUseForm>({
    defaultValues: {
      shortId: ''
    }
  })
}