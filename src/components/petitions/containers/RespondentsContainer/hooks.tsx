import { useMemo, useContext, useEffect } from "react"
import PetitionCtx from "@/components/petitions/context"
import { useCreatePetitionFormCtx } from "@/components/petitions/forms/create/CreatePetitionForm/hooks"

// Types
import * as AppTypes from '@/context/App/types'

export const useSetContainerVisibility = () => {
  const { showRespondentsContainer } = useContext(PetitionCtx)

  return showRespondentsContainer
}

export const useSetRespondents = () => { // Set respondents
  const { searchValue } = useContext(PetitionCtx)

  const { watch } = useCreatePetitionFormCtx()

  let respondents = watch('Respondents') || []
  
  const data = useMemo(() => {
    if(searchValue) { // Handle applied searchValue
      const regex = new RegExp(searchValue, 'i')

      respondents = respondents.filter(respondent => { // Existing contacts
        const searchableProps: (keyof AppTypes.RespondentCreateInterface)[] = ['name', 'address']

        return searchableProps.some(prop => {
          const value = respondent[prop]
          return value && regex.test(value as string)
        })
      })
    } 

    return respondents.sort((a, b) => {
      const isAEmpty = !a.name && !a.address && !a.uuid
      const isBEmpty = !b.name && !b.address && !b.uuid
      
      if(isAEmpty && !isBEmpty) return -1
      if(!isAEmpty && isBEmpty) return 1
      
      return 0
    })
  }, [searchValue, respondents])

  return data
}

export const useSetTotalPages = (count: number) => {
  const { dispatch } = useContext(PetitionCtx)

  const totalPages = Math.ceil(count / 20) || 1

  useEffect(() => {
    dispatch({ type: 'SET_TOTAL_RESPONDENTS_PAGES', payload: totalPages })
  }, [totalPages])
}

export const useHandlePageNavBtns = () => {
  const { currentRespondentsPage, totalRespondentsPages, dispatch } = useContext(PetitionCtx)

  const prevPageBtn = useMemo(() => {
    const onClick = () => {
      if(currentRespondentsPage !== 0) {
        dispatch({ type: 'SET_CURRENT_RESPONDENTS_PAGE', payload: currentRespondentsPage - 1 })
      }
    }

    const disabled = currentRespondentsPage === 1

    return { onClick, disabled }
  }, [currentRespondentsPage])

  const nextPageBtn = useMemo(() => {
    const onClick = () => {
      if(currentRespondentsPage < totalRespondentsPages) {
        dispatch({ type: 'SET_TOTAL_RESPONDENTS_PAGES', payload: currentRespondentsPage + 1 })
      }
    }

    const disabled = currentRespondentsPage === totalRespondentsPages

    return { onClick, disabled }
  }, [currentRespondentsPage, totalRespondentsPages])

  return { prevPageBtn, nextPageBtn }
}