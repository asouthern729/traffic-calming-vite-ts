import { verifyRespondent } from "../../../../context/App/AppActions"
import { errorPopup, infoPopup } from "../../../../utils/Toast/Toast"

// Types
import { HandleValidateRespondentFormSubmitProps } from "./types"

export const handleValidateRespondentFormSubmit = async (formData: HandleValidateRespondentFormSubmitProps['formData'], options: HandleValidateRespondentFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { navigate } = options

  const result = await verifyRespondent(formData.shortId)

  if(result.success) { // Navigate to respondent page on success
    infoPopup(result.msg as string)
    navigate()
  } else errorPopup(result.msg)
}