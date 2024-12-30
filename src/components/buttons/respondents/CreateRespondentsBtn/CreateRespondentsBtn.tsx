import { useContext } from "react"
import { useFormContext } from "react-hook-form"
import AppContext from "../../../../context/App/AppContext"
import { handleFileSelect } from "./utils"

// Types
import { UpdatePetitionFormUseForm } from "../../../forms/update/UpdatePetitionForm/types"

function CreateRespondentsBtn() {
  const { dispatch } = useContext(AppContext)

  const methods = useFormContext<UpdatePetitionFormUseForm>()

  return (
    <button
      type="button"
      className="btn btn-sm btn-primary uppercase shadow w-full">
      <label htmlFor="file" className="w-full hover:cursor-pointer">Add From File</label>
      <input 
        data-testid="file-select"
        id="file"
        type="file"
        className="hidden"
        accept=".csv"
        onChange={(event) => handleFileSelect(methods, event, { dispatch })} />
    </button>

  )
}

export default CreateRespondentsBtn