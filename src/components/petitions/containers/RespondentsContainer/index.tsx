import { useRef } from "react"
import { useSetTotalPages, useSetContainerVisibility, useSetRespondents } from "./hooks"

// Components
import Search from "../../search/Search"
import RespondentsNavContainer from "../RespondentsNavContainer"
import HideResponded from "../../buttons/respondents/HideResponded"
import CreateRespondentBtnsContainer from "../CreateRepondentBtnsContainer"
import * as Components from './components'

function RespondentsContainer() {
  const visible = useSetContainerVisibility()

  const topRef = useRef<HTMLDivElement>(null)

  const respondents = useSetRespondents()

  useSetTotalPages(respondents.length)

  if(!visible) return ( // if !visible - show button
    <div className="mx-auto">
      <Components.ShowRespondentsBtn />
    </div>
  )

  return (
    <div className="flex flex-col items-center">
      <Components.ShowRespondentsBtn />

      <div ref={topRef} className="flex flex-col w-full">
        <div className="flex flex-col gap-8 mt-10 px-12 py-10 bg-neutral justify-between items-center w-full xl:relative xl:flex-row xl:p-12 xl:mt-10">
          <Search />
          <CreateRespondentBtnsContainer />

          <div className="ml-auto">
            <RespondentsNavContainer />
          </div>
        </div>

        <div className="flex flex-col gap-10 py-10">
          <HideResponded />
          <Components.PageData respondents={respondents} />
        </div>

        <div className="relative flex justify-between">
          <Components.TopBtn
            topRef={topRef} 
            visible={!!respondents.length} />
            <div className="ml-auto">
              <RespondentsNavContainer />
            </div>
        </div>
      </div>
    </div>
  )
}

export default RespondentsContainer