// Types
import { Dispatch, SetStateAction } from "react"
import { FieldArrayWithId } from "react-hook-form"
import { UpdatePetitionFormUseForm } from "../../forms/update/UpdatePetitionForm/types"

export interface RespondentsContainerProps { // RespondentsContainer props
  respondents: FieldArrayWithId<UpdatePetitionFormUseForm, "respondents" | "newRespondents", "id">[]
  newRespondents: FieldArrayWithId<UpdatePetitionFormUseForm, "respondents" | "newRespondents", "id">[]
}

export interface RespondentsContainerState { // RespondentsContainer state
  showContainer: boolean
  currentPage: number
  hideResponded: boolean
}

export interface UseSetRespondentsProps { // useSetRespondents hook props
  respondents: FieldArrayWithId<UpdatePetitionFormUseForm, "respondents" | "newRespondents", "id">[]
  newRespondents: FieldArrayWithId<UpdatePetitionFormUseForm, "respondents" | "newRespondents", "id">[]
  hideResponded: boolean
}

export interface UseSetRespondentsReturn { // useSetRespondents hook return obj
  existingArray: FieldArrayWithId<UpdatePetitionFormUseForm, "respondents" | "newRespondents", "id">[]
  newArray: FieldArrayWithId<UpdatePetitionFormUseForm, "respondents" | "newRespondents", "id">[]
}

export interface HandlePageBtnClickProps { // handleNextPageBtnClick fn and handlePrevPageBtnClick fn props
  setState: Dispatch<SetStateAction<RespondentsContainerState>>
}

export interface SetPageDataProps { // setPageData fn props
  respondents: FieldArrayWithId<UpdatePetitionFormUseForm, "respondents" | "newRespondents", "id">[]
  newRespondents: FieldArrayWithId<UpdatePetitionFormUseForm, "respondents" | "newRespondents", "id">[]
  existingArray: FieldArrayWithId<UpdatePetitionFormUseForm, "respondents" | "newRespondents", "id">[]
  newArray: FieldArrayWithId<UpdatePetitionFormUseForm, "respondents" | "newRespondents", "id">[]
  currentPage: number
}