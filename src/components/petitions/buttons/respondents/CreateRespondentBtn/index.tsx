import { useOnClick } from './hooks'

function CreateRespondentBtn() {
  const onClick = useOnClick()

  return (
    <button 
      type="button"
      className="btn btn-sm btn-primary uppercase shadow w-full"
      onClick={onClick}>
        Create New Respondent
    </button>
  )
}

export default CreateRespondentBtn