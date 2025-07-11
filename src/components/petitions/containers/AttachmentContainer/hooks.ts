import { useCallback, useState } from 'react'
import { useQueryClient } from 'react-query'
import { authHeaders } from '@/helpers/utils'
import { useEnableQuery } from '@/helpers/hooks'
import * as AppActions from '@/context/App/AppActions'
import { useCreatePetitionFormCtx } from '@/components/petitions/forms/create/CreatePetitionForm/hooks'
import { errorPopup, savedPopup } from '@/utils/Toast/Toast'

export const useHandleDeleteAttachmentBtn = () => {
  const { getValues, setValue } = useCreatePetitionFormCtx()

  const [state, setState] = useState<{ active: boolean }>({ active: false })

  const queryClient = useQueryClient()

  const uuid = getValues(`Attachment.uuid`)

  const petititonUUID = getValues('uuid')
  
  const visible = !!getValues('Attachment')

  const { enabled, token } = useEnableQuery()

  const onClick = useCallback(async () => {
    if(!state.active) {
      setState({ active: true })
      return
    }

    if(!enabled || !token) return

    if(uuid) { // Delete attachment from database
      const result = await AppActions.deleteAttachment(uuid, authHeaders(token))

      if(result.success) {
        savedPopup(result.msg)
        queryClient.invalidateQueries(['getPetition', petititonUUID])
      } else errorPopup(result.msg)
    }

    setValue('Attachment', null)
  }, [state.active, uuid, enabled, token, setValue, petititonUUID, queryClient])

  const label = !state.active ? 'Remove Attachment' : 'Confirm Remove Attachment'

  return { onClick, label, visible }
}