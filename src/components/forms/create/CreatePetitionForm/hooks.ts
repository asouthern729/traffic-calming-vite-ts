import { useFieldArray, useForm, useFormContext } from "react-hook-form"
import { v4 as uuidv4 } from 'uuid'

// Types
import { UseFormReturn } from "react-hook-form"
import { UpdatePetitionFormUseForm } from "../../update/UpdatePetitionForm/types"
import { CreatePetitionFormUseForm, UseCreatePetitionFormReturn } from './types'

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

export const useCreatePetitionFormContext = (): { methods: UseFormReturn<CreatePetitionFormUseForm|UpdatePetitionFormUseForm> } => { // CreatePetitionForm context
  const methods = useFormContext<CreatePetitionFormUseForm|UpdatePetitionFormUseForm>()

  return { methods }
}