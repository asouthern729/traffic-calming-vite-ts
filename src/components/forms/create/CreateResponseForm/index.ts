import { useForm } from "react-hook-form"
import { handleSuccessfulFormSubmit } from "../../../../helpers"
import { createResponse } from "../../../../context/App/AppActions"

// Types
import { UseFormReturn } from "react-hook-form"
import { VoteBtnProps } from "../../../buttons/forms/VoteBtn/types"
import { UseCreateResponseFormProps, CreateResponseFormUseForm, SetVoteBtnProps, HandleVoteBtnClickProps } from "./types"
import { errorPopup } from "../../../../utils/Toast/Toast"

export const useCreateResponseForm = (respondent: UseCreateResponseFormProps['respondent']): UseFormReturn<CreateResponseFormUseForm> => { // CreateResponseForm useForm
  return useForm<CreateResponseFormUseForm>({
    defaultValues: {
      response: null,
      parentId: respondent.uuid,
      shortId: respondent.shortId 
    }
  })
}

export const setVoteBtnProps = (type: SetVoteBtnProps['type'], state: SetVoteBtnProps['state'], options: SetVoteBtnProps['options']): VoteBtnProps => { // Vote yes and vote no btn props
  const btnProps: VoteBtnProps = {
    label: 'Vote no - not in favor',
    type: 'VoteNo',
    handleClick: () => handleVoteBtnClick(type, state, { ...options }),
    active: false
  }
  
  if(type === 'VoteNo') { // Vote no btn props
    if(!state.voteNoBtnActive) {
      return btnProps
    } else {
      btnProps.label = 'Confirm No Vote'
      btnProps.active = true
      return btnProps
    }
  }

  btnProps.type = 'VoteYes'

  if(!state.voteYesBtnActive) { // Vote yes btn props
    btnProps.label = 'Vote yes - in favor'
    return btnProps
  } else {
    btnProps.label = 'Confirm Yes Vote'
    btnProps.active = true
    return btnProps
  }
}

const handleVoteBtnClick = async (type: HandleVoteBtnClickProps['type'], state: HandleVoteBtnClickProps['state'], options: HandleVoteBtnClickProps['options']): Promise<void> => { // Handle vote yes or no btn click
  const { setState, methods: { setValue, getValues }, navigate } = options

  switch(type) {
    case 'VoteNo': // No vote
      if(!state.voteNoBtnActive) {
        setState(prevState => ({ ...prevState, voteNoBtnActive: true }))
      } else {
        setValue('response', false, { shouldValidate: true }) // Update form state
      } 
      break 
    default: // Yes vote
      if(!state.voteYesBtnActive) {
        setState(prevState => ({ ...prevState, voteYesBtnActive: true }))
      } else {
        setValue('response', true, { shouldValidate: true })
        navigate()
      }
  }

  if(getValues('response') !== null) { // If response is populated - fire API call
    const obj: CreateResponseFormUseForm = {
      ...getValues()
    }

    const result = await createResponse(obj)
    
    if(result.success) {
      handleSuccessfulFormSubmit(result.msg as string, { navigate })
    } else errorPopup(result.msg || 'Something Went Wrong')
  }
}