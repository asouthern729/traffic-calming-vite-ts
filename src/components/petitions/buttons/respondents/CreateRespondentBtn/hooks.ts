import { useFieldArray } from "react-hook-form"
import { useCreatePetitionFormCtx } from "@/components/petitions/forms/create/CreatePetitionForm/hooks"

export const useOnClick = () => {
  const { control, getValues } = useCreatePetitionFormCtx()

  const { append } = useFieldArray({
    control,
    name: 'Respondents'
  })

  const parentId = getValues('uuid') as string

  return () => append({
    name: '',
    address: '',
    ownerAddress: null,
    ownerCity: null,
    ownerState: null,
    ownerZIP: null,
    parentId
  })
}