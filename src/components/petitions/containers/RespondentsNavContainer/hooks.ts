import { useContext, useMemo } from "react"
import PetitionCtx from "@/components/petitions/context"

export const useHandleRespondentsPageBtns = () => {
  const { currentRespondentsPage, totalRespondentsPages, dispatch } = useContext(PetitionCtx)

  const handlePrevPageBtn = useMemo(() => {
    const onClick = () => {
      if(currentRespondentsPage !== 1) {
        dispatch({ type: 'SET_CURRENT_RESPONDENTS_PAGE', payload: currentRespondentsPage - 1 })
      }
    }

    const disabled = currentRespondentsPage === 1

    return { onClick, disabled }
  }, [currentRespondentsPage, totalRespondentsPages])

  const handleNextPageBtn = useMemo(() => {
    const onClick = () => {
      if(currentRespondentsPage < totalRespondentsPages) {
        dispatch({ type: 'SET_CURRENT_RESPONDENTS_PAGE', payload: currentRespondentsPage + 1 })
      }
    }

    const disabled = currentRespondentsPage === totalRespondentsPages

    return { onClick, disabled }
  }, [currentRespondentsPage, totalRespondentsPages])

  return { handlePrevPageBtn, handleNextPageBtn, pages: { currentRespondentsPage, totalRespondentsPages } }
}