// Components
import CreateRespondentBtn from '../../buttons/respondents/CreateRespondentBtn/CreateRespondentBtn'
import CreateRespondentsBtn from "../../buttons/respondents/CreateRespondentsBtn/CreateRespondentsBtn"
import DownloadTemplateBtn from '../../buttons/forms/DownloadTemplateBtn/DownloadTemplateBtn'

function CreateRespondentBtnsContainer() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-fit xl:top-1/2 xl:left-1/2 xl:transform xl:-translate-x-1/2 xl:-translate-y-1/2 xl:absolute">
      <CreateRespondentBtn />
      <CreateRespondentsBtn />
      <DownloadTemplateBtn />
    </div>
  )
}

export default CreateRespondentBtnsContainer