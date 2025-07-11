import { useState, useCallback } from "react"
import { useQueryClient } from "react-query"
import { useFieldArray } from "react-hook-form"
import { authHeaders } from "@/helpers/utils"
import { useCreatePetitionFormCtx } from "@/components/petitions/forms/create/CreatePetitionForm/hooks"
import * as AppActions from '@/context/App/AppActions'
import { useEnableQuery } from "@/helpers/hooks"
import { savedPopup, errorPopup } from "@/utils/Toast/Toast"

export const useHandleDeleteRespondentBtn = (index: number) => {
  const [state, setState] = useState<{ active: boolean }>({ active: false })

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  const { getValues, control } = useCreatePetitionFormCtx()

  const { remove } = useFieldArray({
    control,
    name: 'Respondents'
  })

  const uuid = getValues(`Respondents.${ index }.uuid`) as string
  const petitionUUID = getValues('uuid')
  const disabled = !!getValues(`Respondents.${ index }.Response`)

  const onClick = useCallback(async () => {
    if(!state.active) {
      setState({ active: true })
      return
    }

    if(!enabled || !token) return

    const result = await AppActions.deleteRespondent(uuid, authHeaders(token))

    if(result.success) {
      remove(index)
      queryClient.invalidateQueries(['getPetition', petitionUUID])
      savedPopup(result.msg)
    } else errorPopup(result.msg)
  }, [state.active, uuid, petitionUUID, enabled, token, remove, queryClient])

  const label = !state.active ? 'Delete' : 'Confirm Delete'

  return { onClick, label, disabled }
}