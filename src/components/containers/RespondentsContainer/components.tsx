import { useContext } from "react"
import AppContext from "../../../context/App/AppContext"

// Types
import { ReactElement } from "react"
import { SetPageDataProps } from "./types"

// Components
import Loading from "../../loading/Loading/Loading"
import UpdateRespondentForm from "../../forms/update/UpdateRespondentForm/UpdateRespondentForm"
import CreateRespondentForm from "../../forms/create/CreateRespondentForm/CreateRespondentForm"

export const PageData = ({ respondents, newRespondents, existingArray, newArray, currentPage }: SetPageDataProps) => {
  const { searchingRespondents } = useContext(AppContext)

  if(searchingRespondents) return <Loading />

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