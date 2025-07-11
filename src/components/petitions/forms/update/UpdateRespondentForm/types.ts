// Types
import { Dispatch, SetStateAction } from 'react'
import { FieldArrayWithId } from 'react-hook-form'
import { UpdatePetitionFormUseForm } from '../../../public/forms/update/UpdatePetitionForm/types'

export interface UpdateRespondentFormProps { // UpdateREspondentForm props
  index: number
}

export interface UpdateRespondentFormState { // UpdateRespondentForm state obj
  deleteBtnActive: boolean
}

export interface UpdateRespondentFormUseForm { // UpdateRespondentForm useForm
  name: string | null
  address: string
  ownerAddress: string | null
  ownerCity: string | null
  ownerState: string | null
  ownerZIP: string | null
  readonly shortId: string
  readonly hasResponded: boolean
  readonly response: boolean | null
  readonly parentId: string
  readonly uuid: string 
  [key: string]: string | boolean | null
}

export interface SetDeleteBtnProps { // setDeleteBtn fn props
  deleteBtnActive: boolean
  hasResponded: boolean
  uuid: string
  options: {
    setState: Dispatch<SetStateAction<UpdateRespondentFormState>>
    invalidateQuery: () => void
  }
}

export interface FilterRespondentsProps { // filterRespondents fn props
  respondents: FieldArrayWithId<UpdatePetitionFormUseForm, "respondents" | "newRespondents", "id">[]
  uuid: string
}

export enum StateAbbreviations {
  AL = "AL",
  AK = "AK",
  AZ = "AZ",
  AR = "AR",
  CA = "CA",
  CO = "CO",
  CT = "CT",
  DE = "DE",
  FL = "FL",
  GA = "GA",
  HI = "HI",
  ID = "ID",
  IL = "IL",
  IN = "IN",
  IA = "IA",
  KS = "KS",
  KY = "KY",
  LA = "LA",
  ME = "ME",
  MD = "MD",
  MA = "MA",
  MI = "MI",
  MN = "MN",
  MS = "MS",
  MO = "MO",
  MT = "MT",
  NE = "NE",
  NV = "NV",
  NH = "NH",
  NJ = "NJ",
  NM = "NM",
  NY = "NY",
  NC = "NC",
  ND = "ND",
  OH = "OH",
  OK = "OK",
  OR = "OR",
  PA = "PA",
  RI = "RI",
  SC = "SC",
  SD = "SD",
  TN = "TN",
  TX = "TX",
  UT = "UT",
  VT = "VT",
  VA = "VA",
  WA = "WA",
  WV = "WV",
  WI = "WI",
  WY = "WY"
}