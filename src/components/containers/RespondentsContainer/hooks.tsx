import { useMemo, useContext } from "react"
import AppContext from "../../../context/App/AppContext"

// Types
import { FieldArrayWithId } from "react-hook-form"
import { UpdatePetitionFormUseForm } from "../../forms/update/UpdatePetitionForm/types"
import { UseSetRespondentsProps, UseSetRespondentsReturn } from "./types"

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