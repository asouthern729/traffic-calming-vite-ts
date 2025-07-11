import { useCallback } from "react"
import { useNavigate } from "react-router"
import { useForm, useFormContext } from "react-hook-form"
import { v4 as uuidv4 } from 'uuid'
import { useEnableQuery } from "@/helpers/hooks"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleCreatePetition } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useCreatePetitionForm = () => { // CreatePetitionForm useForm

  return useForm<AppTypes.PetitionCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      description: '',
      startDate: '',
      endDate: '',
      Respondents: [],
      Attachment: null,
      uuid: uuidv4()
    }
  })
}

export const useCreatePetitionFormCtx = () => { // CreatePetitionForm context
  
  return useFormContext<AppTypes.PetitionCreateInterface>()
}

export const useOnCancelBtnClick = () => {
  const navigate = useNavigate()

  return () => navigate('/petitions')
}

export const useHandleFormSubmit = () => {
  const navigate = useNavigate()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: AppTypes.PetitionCreateInterface) => {
    if(!enabled || !token) return

    handleCreatePetition(formData, token)
      .then(() => navigate('/petitions'))
      .catch((err) => errorPopup(err))
  }, [enabled, token, navigate])
}