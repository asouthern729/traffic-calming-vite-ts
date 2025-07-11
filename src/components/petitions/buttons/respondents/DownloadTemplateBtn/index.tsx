import * as AppActions from '@/context/App/AppActions'

function DownloadTemplateBtn() {
  
  return (
    <button 
      type="button"
      className="btn btn-sm btn-info uppercase w-full"
      onClick={() => AppActions.downloadRespondentTemplate()}>
        Download Template
    </button>
  )
}

export default DownloadTemplateBtn