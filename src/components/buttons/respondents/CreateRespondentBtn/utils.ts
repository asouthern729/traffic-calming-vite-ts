// Types
import { CreateRespondentFormUseForm } from "../../../forms/create/CreateRespondentForm/types"
import { HandleCreateBtnClickProps } from "./types"

export const handleCreateBtnClick = (methods: HandleCreateBtnClickProps['methods']): void => {
  const existingValues = methods.getValues('newRespondents')
  const newValue: CreateRespondentFormUseForm = {
    name: '',
    address: '',
    ownerAddress: '',
    ownerCity: '',
    ownerState: '',
    ownerZIP: '',
    parentId: methods.getValues('uuid')
  }

  methods.setValue('newRespondents', [ ...existingValues, newValue ])
}