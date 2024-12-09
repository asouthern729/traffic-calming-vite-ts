// Types
import { Dispatch } from "react"

export interface AppContextObj { // App ctx
  dispatch: Dispatch<AppAction>
  activePage: Page
  searchingRespondents: boolean
  searchValue: string
  showMenu: boolean
}

export interface AppState {
  activePage: Page
  searchingRespondents: boolean
  searchValue: string
  showMenu: boolean
}

export interface AppReducerProps { // AppReducer props
  state: AppState
  action: AppAction
}

export interface ServerResponse { // Server response object
  success: boolean
  msg?: string
}

export interface GetPetitionsResponse extends ServerResponse {
  data: Petition[]
}

export interface GetPetitionResponse extends ServerResponse {
  data: Petition
}

export interface CreatePetitionResponse extends ServerResponse {
  data: {
    petitionId: string
    description: string
    startDate: string
    endDate: string
  } & BaseObj
}

export interface VerifyRespondentResponse extends ServerResponse {
  data: Respondent
}

export interface CreateResponseResponse extends ServerResponse {
  data: Response
}

export interface SearchByADDRKEYResponse extends ServerResponse {
  data: RespondentObj[]
}

export interface GetAttachmentResponse extends ServerResponse { 
  data: {
    data: {
      type: string
      data: ArrayBuffer
    } 
  } & PetitionAttachment
}

export interface PetitionObj {
  description: string
  startDate: string
  endDate: string
  uuid?: string
}

export interface RespondentObj {
  name: string | null
  address: string
  ownerAddress: string | null
  ownerCity: string | null
  ownerState: string | null
  ownerZIP: string | null
  parentId?: string
  uuid?: string
}

export interface ResponseObj {
  response: boolean
  parentId: string
  uuid?: string
}

export interface Petition extends BaseObj {
  petitionId: string
  description: string
  startDate: string
  endDate: string
  Respondents: Respondent[]
  PetitionAttachment: PetitionAttachment
}

export interface Respondent extends BaseObj {
  name: string | null
  address: string
  ownerAddress: string | null
  ownerCity: string | null
  ownerState: string | null
  ownerZIP: string | null
  shortId: string
  parentId: string
  Petition: Petition
  Response: Response
}

export interface Response extends BaseObj {
  response: boolean
  parentId: string
  uuid: string
}

export interface PetitionAttachment extends BaseObj {
  parentId: string
  fileType: 'pdf' | 'jpeg'
}

export type AppAction =
  | { type: 'SET_SEARCH_VALUE', payload: string }
  | { type: 'OPEN_CLOSE_SHOW_MENU', payload: boolean }
  | { type: 'RESET_CTX', payload: undefined }
  | { type: 'SET_ACTIVE_PAGE', payload: Page }
  | { type: 'TOGGLE_SEARCHING_RESPONDENTS', payload: undefined }

export type Page = 
  | "Public"
  | "Create Petition"
  | "Manage Petitions"

interface BaseObj {
  uuid: string
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
}