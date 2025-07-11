import { useOnAttachmentBtnClick, useHandleVoteBtns } from "./hooks"
import icon from '@/assets/icons/house/house.svg'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import VoteBtn from "@/components/public/buttons/VoteBtn"

export const ResponseHeader = ({ respondent }: { respondent: AppTypes.RespondentInterface }) => {

  return (
    <HouseIcon respondent={respondent} />
  )
}

export const PetitionDescription = ({ petition }: { petition: AppTypes.PetitionInterface | undefined }) => {

  return (
    <div className="flex flex-col gap-6 p-6 pt-4 m-2 bg-secondary/10 items-center w-full lg:p-10 lg:m-4 lg:text-lg">
      <div className="flex flex-col gap-2 items-center">
        <div className="text-warning text-lg uppercase font-bold lg:text-2xl">Petition {petition?.petitionId}</div>
        <PetitionEndDate endDate={petition?.endDate} />
      </div>
      <p className="italic text-sm text-center leading-relaxed lg:text-lg">{petition?.description}</p>
    </div>
  )
}

export const AttachmentBtn = ({ respondent }: { respondent: AppTypes.RespondentInterface }) => { // Form attachment
  const { onClick, visible } = useOnAttachmentBtnClick(respondent.Petition?.Attachment)

  if(!visible) return null

  return (
    <button 
      type="button"
      className="btn btn-outline btn-info uppercase"
      onClick={onClick}>
        Click To View Attachment
    </button>
  )
}

export const EmailLink = () => {

  return (
    <p className="text-neutral-content text-sm text-center pt-8 w-3/4 lg:text-lg">Please direct any questions or comments regarding this traffic calming petition to <a href="mailto:tocmail@franklintn.gov" className="text-info" target="_blank">tocmail@franklintn.gov</a></p>
  )
}

export const Buttons = ({ petition }: { petition: AppTypes.PetitionInterface | undefined }) => { // Form buttons
  const { noBtn, yesBtn } = useHandleVoteBtns(petition?.uuid)

  return (
    <div className="flex flex-col gap-4 w-full">
      <VoteBtn 
        type={'VoteNo'}
        onClick={noBtn.onClick}>
          {noBtn.label}
      </VoteBtn>
      <VoteBtn
        type={'VoteYes'}
        onClick={yesBtn.onClick}>
          {yesBtn.label}
      </VoteBtn>
    </div>
  )
}

const HouseIcon = ({ respondent }: { respondent: AppTypes.RespondentInterface }) => {

  return (
    <>
      <img src={icon} alt="house icon" className="w-[70px] mt-3 lg:w-[100px]" />
      <span className="text-lg lg:text-2xl">{respondent.address}</span>
    </>
  )
}

const PetitionEndDate = ({ endDate }: { endDate: string | undefined }) => {

  return (
    <small className="text-neutral-content font-light badge badge-primary badge-lg">Closes {endDate}</small>
  )
}