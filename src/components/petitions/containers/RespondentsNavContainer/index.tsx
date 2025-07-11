import { useHandleRespondentsPageBtns } from './hooks'

// Components
import PrevPageBtn from "@/components/layout/buttons/nav/PrevPageBtn"
import NextPageBtn from "@/components/layout/buttons/nav/NextPageBtn"

function RespondentsNavContainer() {
  const { handlePrevPageBtn, handleNextPageBtn, pages } = useHandleRespondentsPageBtns()
  
  return (
    <div data-testid="respondents-nav-container" className="flex flex-col gap-1 items-center">
      <div className="flex gap-4">
        <PrevPageBtn 
          onClick={handlePrevPageBtn.onClick}
          disabled={handleNextPageBtn.disabled} />
        <NextPageBtn 
          onClick={handleNextPageBtn.onClick}
          disabled={handleNextPageBtn.disabled} />
      </div>
      <div className="text-sm text-neutral-content uppercase lg:text-md">Page {pages.currentRespondentsPage} of {pages.totalRespondentsPages}</div>
    </div>
  )
}

export default RespondentsNavContainer