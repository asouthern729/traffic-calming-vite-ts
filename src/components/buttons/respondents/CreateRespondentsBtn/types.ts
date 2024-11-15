// Types
import { ChangeEvent, Dispatch } from "react"
import { UseFormReturn } from "react-hook-form"
import { AppAction } from "../../../../context/App/types"
import { UpdatePetitionFormUseForm } from "../../../forms/update/UpdatePetitionForm/types"

export interface HandleFileSelectProps { // handleFileSelect fn props
  methods: UseFormReturn<UpdatePetitionFormUseForm>
  event: ChangeEvent<HTMLInputElement>
  options: {
    dispatch: Dispatch<AppAction>
  }
}