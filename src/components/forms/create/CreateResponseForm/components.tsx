import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useCreateResponseFormContext, useGetAttachment } from "./hooks"
import { setVoteBtnProps } from "./utils"

// Types
import { Respondent } from '../../../../context/App/types'
import { CreateResponseFormState, AttachmentState } from './types'

// Components
import VoteBtn from "../../../buttons/forms/VoteBtn/VoteBtn"

export const Attachment = ({ respondent }: { respondent: Respondent }) => { // Form attachment
  const [state, setState] = useState<AttachmentState>({ blobURL: undefined, type: null })

  useGetAttachment(respondent.Petition.PetitionAttachment?.uuid, { setState })

  const showAttachment = state.blobURL ? true : false

  return (
    <>
      {showAttachment && (
        <SetAttachment
          blobURL={state.blobURL}
          type={state.type} />
      )}
    </>
  )
}

export const Buttons = () => { // Form buttons
  const { methods } = useCreateResponseFormContext()

  const [state, setState] = useState<CreateResponseFormState>({ voteNoBtnActive: false, voteYesBtnActive: false })

  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4 w-full">
      <VoteBtn { ...setVoteBtnProps('VoteNo', state, { setState, methods, navigate: () => navigate('/') }) } />
      <VoteBtn { ...setVoteBtnProps('VoteYes', state, { setState, methods, navigate: () => navigate('/') }) } />
    </div>
  )
}

const SetAttachment = ({ blobURL, type }: AttachmentState) => { // Set attachment
  const element = type === 'image/jpeg' ? <a href={blobURL} target="_blank" title={'Open attachment in new tab'}><img src={blobURL} alt="petition attachment" /></a> : <a href={blobURL} target="_blank" className="btn btn-outline btn-info uppercase">Click To View Attachment</a>

  return element
}