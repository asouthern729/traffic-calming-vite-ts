import { useCreatePetitionFormCtx } from '@/components/petitions/forms/create/CreatePetitionForm/hooks'
import { useHandleDeleteBtn } from './hooks'

// Components
import DeleteBtn from "@/components/form-elements/buttons/DeleteBtn"

export const DeletePetitionBtn = () => {
  const { getValues } = useCreatePetitionFormCtx()

  const uuid = getValues('uuid') as string

  const { onClick, label } = useHandleDeleteBtn(uuid)

  return (
    <div className="mx-auto mt-10">
      <DeleteBtn onClick={onClick}>
        {label}
      </DeleteBtn>
    </div>
  )
}