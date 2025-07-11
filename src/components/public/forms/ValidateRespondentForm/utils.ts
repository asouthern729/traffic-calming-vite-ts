import { verifyRespondent } from "../../../../context/App/AppActions"
import { errorPopup, infoPopup } from "../../../../utils/Toast/Toast"

export const handleValidateRespondent = async (formData: { shortId: string }) => { // Handle form submit
  const result = await verifyRespondent(formData.shortId)

  if(result.success) {
    infoPopup(result.msg as string)
  } else errorPopup(result.msg)
}