import { useFormContext } from "react-hook-form"
import { handleCreateBtnClick } from "./utils"

// Types
import { UpdatePetitionFormUseForm } from "../../../forms/update/UpdatePetitionForm/types"

function CreateRespondentBtn() {
  const methods = useFormContext<UpdatePetitionFormUseForm>()

  return (
    <button 
      type="button"
      className="btn btn-sm btn-primary uppercase shadow w-full"
      onClick={() => handleCreateBtnClick(methods)}>
        Create New Respondent
    </button>
  )
}

export default CreateRespondentBtn