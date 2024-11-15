// Types
import { UseFormReturn } from "react-hook-form"
import { UpdatePetitionFormUseForm } from "../../../forms/update/UpdatePetitionForm/types"

export interface HandleCreateBtnClickProps { // handleCreateBtnClick fn props
  methods: UseFormReturn<UpdatePetitionFormUseForm>
}