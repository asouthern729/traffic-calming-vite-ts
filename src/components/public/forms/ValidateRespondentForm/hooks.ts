import { useCallback } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { handleValidateRespondent } from './utils'
import { errorPopup } from "@/utils/Toast/Toast"

export const useValidateRespondentForm = () => { // ValidateRespondentForm useForm
  
  return useForm<{ shortId: string }>({
    mode: 'onChange',
    defaultValues: {
      shortId: ''
    }
  })
}

export const useHandleFormSubmit = () => {
  const navigate = useNavigate()
  
  return useCallback((formData: { shortId: string }) => {
    handleValidateRespondent(formData)
      .then(() => navigate(`/respondent?shortId=${ formData.shortId }`))
      .catch((err) => errorPopup(err))
  }, [navigate])
}