import { useForm } from "react-hook-form"
import { verifyRespondent } from "../../../../context/App/AppActions"
import { errorPopup, infoPopup } from "../../../../utils/Toast/Toast"

// Types
import { UseFormReturn } from "react-hook-form"
import { ValidateRespondentFormUseForm, HandleValidateRespondentFormSubmitProps } from "./types"

export const useValidateRespondentForm = (): UseFormReturn<ValidateRespondentFormUseForm> => { // ValidateRespondentForm useForm
  return useForm<ValidateRespondentFormUseForm>({
    defaultValues: {
      shortId: ''
    }
  })
}