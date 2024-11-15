import { useFieldArray, useForm } from "react-hook-form"
import { v4 as uuidv4 } from 'uuid'
import { handleSuccessfulFormSubmit } from "../../../../helpers"
import { createPetition, createRespondents } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { PetitionObj, RespondentObj } from "../../../../context/App/types"
import { CreatePetitionFormUseForm, UseCreatePetitionFormReturn, HandleSubmitCreatePetitionFormProps } from './types'

export const useCreatePetitionForm = (): UseCreatePetitionFormReturn => { // CreatePetitionForm useForm
  const methods = useForm<CreatePetitionFormUseForm>({
    defaultValues: {
      description: '',
      startDate: '',
      endDate: '',
      newRespondents: [],
      uuid: uuidv4()
    }
  })

  const { fields: newRespondents } = useFieldArray({
    control: methods.control,
    name: 'newRespondents'
  })

  return {
    methods,
    newRespondents
  }
}

export const handleSubmitCreatePetitionForm = async (formData: HandleSubmitCreatePetitionFormProps['formData'], options: HandleSubmitCreatePetitionFormProps['options']): Promise<void> => { // Handle form submit
  const { navigate } = options

  const petitionObj: PetitionObj = {
    description: formData.description,
    startDate: formData.startDate,
    endDate: formData.endDate
  }

  const result = await createPetition(petitionObj)

  if(result.success) {
    const newRespondentsArray = formData.newRespondents.map(respondent => {
      const obj: RespondentObj = {
        name: respondent.name,
        address: respondent.address,
        ownerAddress: respondent.ownerAddress,
        ownerCity: respondent.ownerCity,
        ownerState: respondent.ownerState,
        ownerZIP: respondent.ownerZIP,
        parentId: result.data.uuid
      }

      return obj
    })
    
    const newRespondentsResult = await createRespondents(newRespondentsArray)

    if(!newRespondentsResult.success) {
      errorPopup(newRespondentsResult.msg || 'Error Creating Respondents')
    }

    handleSuccessfulFormSubmit(result.msg as string, { navigate })
  } else errorPopup(result.msg || 'Something Went Wrong')
}