import { useState, useCallback } from "react"
import { useNavigate } from "react-router"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import * as AppActions from '@/context/App/AppActions'
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import { savedPopup, errorPopup } from "@/utils/Toast/Toast"
import { handleUpdatePetition, getDirtyRespondentUuids } from './utils'

// Types
import { UseFormReturn } from "react-hook-form"
import * as AppTypes from '@/context/App/types'

export const useUpdatePetitionForm = (petition: AppTypes.PetitionInterface) => { // UpdatePetitionForm useForm

  return useForm<AppTypes.PetitionCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      description: petition.description,
      startDate: petition.startDate,
      endDate: petition.endDate,
      Respondents: setRespondents(petition.Respondents || []),
      Attachment: petition.Attachment,
      uuid: petition.uuid
    }
  })
}

export const useOnCancelBtnClick = () => {
  const navigate = useNavigate()

  return () => navigate('/petitions')
}

export const useHandleDeleteBtn = (uuid: string) => {
  const [state, setState] = useState<{ active: boolean }>({ active: false })

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  const onClick = useCallback(async () => {
    if(!state.active) {
      setState({ active: true })
      return
    }

    if(!enabled || !token) return

    const result = await AppActions.deletePetition(uuid, authHeaders(token))

    if(result.success) {
      savedPopup(result.msg)
      queryClient.invalidateQueries('getPetitions')
    } else errorPopup(result.msg)
  }, [state.active, enabled, token, queryClient])

  const label = !state.active ? 'Delete Petition' : 'Confirm Delete'

  return { onClick, label }
}

export const useHandleFormSubmit = (methods: UseFormReturn<AppTypes.PetitionCreateInterface>) => {
  const { formState: { dirtyFields }, getValues } = methods

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  const values = getValues()

  const dirtyRespondents = getDirtyRespondentUuids(dirtyFields, values)

  return useCallback((formData: AppTypes.PetitionCreateInterface) => {
    if(!enabled || !token) return

    handleUpdatePetition(formData, token, dirtyRespondents)
      .then(() => {
        navigate('/petitions')
        queryClient.invalidateQueries('getPetitions')
        queryClient.invalidateQueries(['getPetition', formData.uuid])
      })
      .catch((err) => errorPopup(err))
  }, [enabled, navigate, token, queryClient])
}

const setRespondents = (respondents: AppTypes.RespondentInterface[]) => {
  return respondents.map(item => {
    const respondent: AppTypes.RespondentCreateInterface & { hasResponded: boolean, response: boolean | undefined } = {
      name: item.name,
      address: item.address,
      ownerAddress: item.ownerAddress,
      ownerCity: item.ownerCity,
      ownerState: item.ownerState,
      ownerZIP: item.ownerZIP,
      shortId: item.shortId,
      hasResponded: item.Response ? true : false,
      response: item.Response?.response,
      parentId: item.parentId,
      uuid: item.uuid
    }

    return respondent
  })
}