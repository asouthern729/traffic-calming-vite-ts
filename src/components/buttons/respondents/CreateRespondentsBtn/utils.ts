import { searchByADDRKEY } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { CreateRespondentFormUseForm } from "../../../forms/create/CreateRespondentForm/types"
import { HandleFileSelectProps } from "./types"

export const handleFileSelect = (methods: HandleFileSelectProps['methods'], event: HandleFileSelectProps['event'], options: HandleFileSelectProps['options']): void => {
  const { dispatch } = options

  dispatch({ type: 'TOGGLE_SEARCHING_RESPONDENTS', payload: undefined })
  
  const file = event.target.files?.length ? event.target.files[0] : null
  const reader = new FileReader()

  reader.onload = async (e) => {
    const contents = e.target?.result?.toString()
    const rows = contents?.split('\r\n').splice(1) // Omit first row / header
    const array = rows?.map(row => row.split(',')) || []
    const addrkeys: string[] = []

    if(rows?.length) {
      array.forEach(row => {
        if(row.length === 1) {
          addrkeys.push(row[0])
        }
      })
    }

    const result = await searchByADDRKEY(addrkeys)

    if(!result.success) {
      return errorPopup(result.msg || 'Something Went Wrong')
    }

    dispatch({ type: 'TOGGLE_SEARCHING_RESPONDENTS', payload: undefined })

    methods.setValue('newRespondents', result.data as CreateRespondentFormUseForm[])
  }

  reader.readAsText(file as File)
}