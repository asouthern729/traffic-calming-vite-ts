import { useHandleFileSelect } from './hooks'

function CreateRespondentsBtn() {
  const handleFileSelect = useHandleFileSelect()

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
        onChange={(e) => handleFileSelect(e)} />
    </button>

  )
}

export default CreateRespondentsBtn