import React, { useContext } from "react"
import PetitionCtx from "@/components/petitions/context"

// Types
import * as AppTypes from '@/context/App/types'

// Components
import UpdateRespondentForm from "@/components/petitions/forms/update/UpdateRespondentForm"
import BackToTopBtn from "@/components/layout/buttons/nav/BackToTopBtn"
import { useCreatePetitionFormCtx } from "@/components/petitions/forms/create/CreatePetitionForm/hooks"
import CreateRespondentForm from "../../forms/create/CreateRespondentForm"

export const ShowRespondentsBtn = () => {
  const { showRespondentsContainer, dispatch } = useContext(PetitionCtx)

  const label = !showRespondentsContainer ? 'Show Respondents' : 'Hide Respondents'

  return (
    <button 
      type="button" 
      onClick={() => dispatch({ type: 'TOGGLE_SHOW_RESPONDENTS_CONTAINER' })}
      className="btn btn-wide btn-secondary uppercase shadow">
        {label}
    </button>
  )
}

export const PageData = ({ respondents }: { respondents: AppTypes.RespondentCreateInterface[] }) => {
  const { currentRespondentsPage } = useContext(PetitionCtx)
  const { getValues } = useCreatePetitionFormCtx()

  const formRespondents = getValues('Respondents') || []
  
  const array = respondents.slice((currentRespondentsPage - 1) * 20, currentRespondentsPage * 20)

  return array.map((respondent, arrayIndex) => {
    if(respondent.uuid) {
      const index = formRespondents.findIndex(item => item.uuid === respondent.uuid)

      return (
        <UpdateRespondentForm 
          key={`respondent-${respondent.uuid}`} 
          index={index} />
      )
    }

    // For new respondents, calculate the actual index in the form array
    const actualIndex = (currentRespondentsPage - 1) * 20 + arrayIndex
    const index = formRespondents.findIndex((item, idx) => 
      idx === actualIndex || 
      (item.address && item.address === respondent.address)
    )

    return (
      <CreateRespondentForm
        key={`respondent-new-${actualIndex}`}
        index={index !== -1 ? index : actualIndex} />
    )
  })
}

export const TopBtn = ({ topRef, visible }: { topRef: React.RefObject<HTMLDivElement>, visible: boolean }) => {
  if(!visible) return null

  return (
    <div className="absolute left-1/2 -translate-x-1/2">
      <BackToTopBtn topRef={topRef} />
    </div>
  )
}