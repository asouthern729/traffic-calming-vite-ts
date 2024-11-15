import { useMemo, useContext } from "react"
import AppContext from "../../../context/App/AppContext"

// Types
import { ReactElement } from "react"
import { FieldArrayWithId } from "react-hook-form"
import { UpdatePetitionFormUseForm } from "../../forms/update/UpdatePetitionForm/types"
import { UseSetRespondentsProps, UseSetRespondentsReturn, SetPageDataProps, HandlePageBtnClickProps } from "./types"

// Components
import UpdateRespondentForm from "../../forms/update/UpdateRespondentForm/UpdateRespondentForm"
import CreateRespondentForm from "../../forms/create/CreateRespondentForm/CreateRespondentForm"

export const useSetRespondents = (respondents: UseSetRespondentsProps['respondents'], newRespondents: UseSetRespondentsProps['newRespondents'], hideResponded: UseSetRespondentsProps['hideResponded']): UseSetRespondentsReturn => { // Set respondents
  const { searchValue } = useContext(AppContext)
  
  const data = useMemo(() => {
    let existingArray: FieldArrayWithId<UpdatePetitionFormUseForm, "respondents" | "newRespondents", "id">[] = []
    let newArray: FieldArrayWithId<UpdatePetitionFormUseForm, "respondents" | "newRespondents", "id">[] = []

    if(searchValue) { // Handle applied searchValue
      const regex = new RegExp(searchValue, 'i')

      existingArray = respondents.filter(respondent => { // Existing contacts
        for(const prop in respondent) {
          if(['name', 'address'].includes(prop) && regex.test(respondent[prop] as string)) {
            return true
          }
        }
      })

      newArray = newRespondents.filter(respondent => { // New contacts
        for(const prop in respondent) {
          if(['name', 'address'].includes(prop) && regex.test(respondent[prop] as string)) {
            return true
          }
        }
      })
    } else {
      existingArray = respondents
      newArray = newRespondents
    }

    if(hideResponded) { // Handle hideResponded filter
      existingArray = existingArray.filter(respondent => !respondent.hasResponded)
    }

    return { existingArray, newArray }
  }, [searchValue, respondents, newRespondents, hideResponded])

  return data
}

export const handleNextPageBtnClick = (setState: HandlePageBtnClickProps['setState']): void => { // Handle next page btn click
  setState(prevState => ({ ...prevState, currentPage: prevState.currentPage + 1 }))
}

export const handlePrevPageBtnClick = (setState: HandlePageBtnClickProps['setState']): void => { // Handle prev page btn click
  setState(prevState => ({ ...prevState, currentPage: prevState.currentPage - 1 }))
}

export const setPageData = (respondents: SetPageDataProps['respondents'], newRespondents: SetPageDataProps['newRespondents'], existingArray: SetPageDataProps['existingArray'], newArray: SetPageDataProps['newArray'], currentPage: SetPageDataProps['currentPage']): ReactElement[] => { // Set existing and new respondents by currentPage
  const array = [ ...newArray, ...existingArray ]

  const combinedArray: ReactElement[] = array.slice((currentPage - 1) * 20, currentPage * 20).map(respondent => {
    if(respondent.uuid) { // Handle existing respondent
      const index = respondents.findIndex(item => item.uuid === respondent.uuid)

      return (
        <UpdateRespondentForm 
          key={`respondent-${ index }`} 
          index={index} />
      )
    }

    const index = newRespondents.findIndex(item => item.id === respondent.id) // New respondents

    return (
      <CreateRespondentForm
        key={`new-respondent-${ respondent.id }`}
        index={index} />
    )
  })

  return combinedArray
}