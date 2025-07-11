// Components
import ValidateRespondentForm from '../../forms/ValidateRespondentForm'

function PublicContainer() {
  
  return (
    <div className="flex flex-col gap-10 m-auto my-10 w-full lg:max-w-3/5">
      <ValidateRespondentForm />
      <p className="text-neutral-content text-center"><a href="https://www.franklintn.gov/government/departments-a-j/engineering/transportation/neighborhood-traffic-calming-program" target="_blank" className="text-info">Click here</a> for more information about City of Franklin traffic calming initiatives</p>
    </div>
  )
}

export default PublicContainer