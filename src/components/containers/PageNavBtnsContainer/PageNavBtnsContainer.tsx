// Types
import { PageNavBtnsContainerProps } from "./types"

// Components
import PrevPageBtn from "../../buttons/nav/PrevPageBtn/PrevPageBtn"
import NextPageBtn from "../../buttons/nav/NextPageBtn/NextPageBtn"

function PageNavBtnsContainer({ handleClick, pages, setState }: PageNavBtnsContainerProps) {
  
  return (
    <div data-testid="page-nav-container" className={`flex flex-col gap-1 items-center ${ pages.totalPages === 0 ? 'hidden' : null }`}>
      <div className="flex gap-4">
        <PrevPageBtn 
          handleClick={() => handleClick.prevPage(setState)}
          disabled={pages.currentPage === 1} />
        <NextPageBtn 
          handleClick={() => handleClick.nextPage(setState)}
          disabled={!pages.totalPages || pages.currentPage === pages.totalPages} />
      </div>
      <div className="text-sm text-neutral-content uppercase lg:text-md">Page {pages.currentPage} of {pages.totalPages}</div>
    </div>
  )
}

export default PageNavBtnsContainer