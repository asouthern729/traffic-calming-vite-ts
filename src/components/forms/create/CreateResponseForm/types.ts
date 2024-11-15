// Types
import { Dispatch, SetStateAction } from "react"
import { UseFormReturn } from "react-hook-form"
import { Respondent } from "../../../../context/App/types"

export interface CreateResponseFormProps { // CreateResponseForm props
  respondent: Respondent
}

export interface CreateResponseFormState { // CreateResponseForm state obj
  voteYesBtnActive: boolean
  voteNoBtnActive: boolean
}

export interface CreateResponseFormUseForm { // CreateResponseForm useForm
  response: boolean | null
  parentId: string
  shortId: string
}

export interface UseCreateResponseFormProps { // useCreateResponseForm hook props
  respondent: Respondent
}

export interface SetVoteBtnProps { // setVoteBtnProps fn props
  type: 'VoteNo' | 'VoteYes'
  state: CreateResponseFormState
  options: {
    setState: Dispatch<SetStateAction<CreateResponseFormState>>
    methods: UseFormReturn<CreateResponseFormUseForm>
    navigate: () => void
  }
}

export interface HandleVoteBtnClickProps { // handleVoteBtnClick fn props
  type: 'VoteNo' | 'VoteYes'
  state: CreateResponseFormState
  options: {
    setState: Dispatch<SetStateAction<CreateResponseFormState>>
    methods: UseFormReturn<CreateResponseFormUseForm>
    navigate: () => void
  }
}