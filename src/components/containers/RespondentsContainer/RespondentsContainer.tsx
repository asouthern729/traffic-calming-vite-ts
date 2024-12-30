import { useState, useRef } from "react"
import { useSetRespondents } from "./hooks"
import { handlePrevPageBtnClick, handleNextPageBtnClick } from './utils'

// Types
import { RespondentsContainerProps, RespondentsContainerState } from "./types"

// Components
import ShowRespondentsContainerBtn from "../../buttons/respondents/ShowRespondentsContainerBtn/ShowRespondentsContainerBtn"
import Search from "../../search/Search/Search"
import PageNavBtnsContainer from "../PageNavBtnsContainer/PageNavBtnsContainer"
import HideResponded from "../../petition/HideResponded/HideResponded"
import CreateRespondentBtnsContainer from "../CreateRepondentBtnsContainer/CreateRespondentBtnsContainer"
import BackToTopBtn from "../../buttons/nav/BackToTopBtn/BackToTopBtn"
import { PageData } from './components'

function RespondentsContainer({ respondents, newRespondents }: RespondentsContainerProps) {
  const [state, setState] = useState<RespondentsContainerState>({ showContainer: false, currentPage: 1, hideResponded: false })

  const topRef = useRef<HTMLDivElement>(null)

  const { existingArray, newArray } = useSetRespondents(respondents, newRespondents, state.hideResponded)

  const totalPages = Math.ceil((existingArray.length + newArray.length) / 20) // 20 results per page

  return (
    <div className="flex flex-col items-center">

      <ShowRespondentsContainerBtn
        label={!state.showContainer ? `Show ${ respondents.length || ' ' } Respondents` : 'Hide Respondents'}
        handleClick={() => setState(prevState => ({ ...prevState, showContainer: !prevState.showContainer }))} />

      <div ref={topRef} className={`${ state.showContainer ? 'flex flex-col w-full' : 'hidden' }`}>
        <div className="flex flex-col gap-8 mt-10 px-12 py-10 bg-neutral justify-between items-center w-full xl:relative xl:flex-row xl:p-12 xl:mt-10">
          <Search placeholder={'by respondent name or address..'} />

          <CreateRespondentBtnsContainer />

          <div className="xl:ml-auto">
            <PageNavBtnsContainer
              handleClick={{
                prevPage: () => handlePrevPageBtnClick(setState),
                nextPage: () => handleNextPageBtnClick(setState) 
              }}
              pages={{
                totalPages,
                currentPage: state.currentPage
              }}
              setState={setState} />
          </div>
          
        </div>

        <div className="flex flex-col gap-10 py-10">
          <HideResponded
            checked={state.hideResponded}
            handleClick={() => setState(prevState => ({ ...prevState, hideResponded: !prevState.hideResponded }))} />
          <PageData
            respondents={respondents}
            newRespondents={newRespondents}
            existingArray={existingArray}
            newArray={newArray}
            currentPage={state.currentPage} />
        </div>

        <div className="relative flex justify-between items-center">
          <div className="mx-auto">
            {respondents.length + newRespondents.length > 0 && (
              <BackToTopBtn topRef={topRef} />
            )}
          </div>
          <div className="absolute right-0">
            <PageNavBtnsContainer
              handleClick={{
                prevPage: () => handlePrevPageBtnClick(setState),
                nextPage: () => handleNextPageBtnClick(setState) 
              }}
              pages={{
                totalPages,
                currentPage: state.currentPage
              }}
              setState={setState} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default RespondentsContainer