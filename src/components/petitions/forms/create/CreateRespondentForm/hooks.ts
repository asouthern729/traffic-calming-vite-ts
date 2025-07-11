import { useFieldArray } from "react-hook-form"
import { useCreatePetitionFormCtx } from "../CreatePetitionForm/hooks"

export const useHandleRemoveRespondent = (index: number) => {
  const { control } = useCreatePetitionFormCtx()

  const { remove } = useFieldArray({
    control,
    name: 'Respondents'
  })

  const onClick = () => {
    remove(index)
  }

  return onClick
}