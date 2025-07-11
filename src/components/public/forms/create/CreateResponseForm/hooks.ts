import { useCallback, useState } from "react"
import { useNavigate } from "react-router"
import { useQueryClient } from "react-query"
import { useForm, useFormContext } from "react-hook-form"
import * as AppActions from '@/context/App/AppActions'

// Types
import * as AppTypes from '@/context/App/types'
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

export const useCreateResponseForm = (respondent: AppTypes.RespondentInterface) => { // CreateResponseForm useForm
  return useForm<AppTypes.ResponseCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      response: undefined,
      parentId: respondent.uuid,
      shortId: respondent.shortId 
    }
  })
}

export const useCreateResponseFormCtx = () => { // CreateResponseForm context

  return useFormContext<AppTypes.ResponseCreateInterface>()
}

export const useOnAttachmentBtnClick = (attachment: AppTypes.AttachmentInterface | undefined) => {
  const downloadAttachment = async (uuid: string) => {
    const result = await AppActions.getAttachment(uuid)

    if(result.success) {
      const buffer = result.data.data.data
      const bufferView = new Uint8Array(buffer)
      const type = result.data.fileType === 'jpeg' ? 'image/jpeg' : 'application/pdf'

      const blob = new Blob([bufferView], { type })
      const blobURL = URL.createObjectURL(blob)

      window.open(blobURL, '_blank')
    }
  }

  const onClick = useCallback(() => {
    if(attachment && attachment.uuid) {
      downloadAttachment(attachment.uuid)
    }
  }, [attachment, downloadAttachment])

  return { onClick, visible: !!attachment }
}

export const useHandleVoteBtns = (petitionUUID: string | undefined) => { // Handle vote buttons
  const [state, setState] = useState<{ voteNoBtnActive: boolean, voteYesBtnActive: boolean }>({ voteNoBtnActive: false, voteYesBtnActive: false })

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { getValues } = useCreateResponseFormCtx()

  const formData = getValues()

  const onNoBtnClick = useCallback(async () => {
    if(!state.voteNoBtnActive) {
      setState(prevState => ({ ...prevState, voteNoBtnActive: true }))
      return
    }

    const result = await AppActions.createResponse({ ...formData, response: false })

    if(result.success) {
      savedPopup(result.msg)
      queryClient.invalidateQueries('getPetitions')
      queryClient.invalidateQueries(['getPetition', petitionUUID])
      navigate('/public')
    } else {
      errorPopup(result.msg)
    }
  }, [state.voteNoBtnActive, petitionUUID, navigate, queryClient])

  const onYesBtnClick = useCallback(async () => {
    if(!state.voteYesBtnActive) {
      setState(prevState => ({ ...prevState, voteYesBtnActive: true }))
      return
    }

    const result = await AppActions.createResponse({ ...formData, response: true })

    if(result.success) {
      savedPopup(result.msg)
      queryClient.invalidateQueries('getPetitions')
      queryClient.invalidateQueries(['getPetition', petitionUUID])
      navigate('/public')
    } else {
      errorPopup(result.msg)
    }
  }, [state.voteYesBtnActive, petitionUUID, queryClient])

  const noBtnLabel = !state.voteNoBtnActive ? 'Vote No - Not In Favor' : 'Confirm No Vote'
  const yesBtnLabel = !state.voteYesBtnActive ? 'Vote Yes - In Favor' : 'Confirm Yes Vote'

  return { noBtn: { onClick: onNoBtnClick, label: noBtnLabel }, yesBtn: { onClick: onYesBtnClick, label: yesBtnLabel } }
}