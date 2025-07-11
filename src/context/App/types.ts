export interface PetitionInterface extends BaseInterface {
  petitionId: string
  description: string
  startDate: string
  endDate: string
  Respondents?: RespondentInterface[]
  Attachment?: AttachmentInterface
}

export interface PetitionCreateInterface extends Omit<PetitionInterface, 'Respondents' | 'Attachment' | 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  _deleted?: boolean
  Respondents?: RespondentCreateInterface[]
  Attachment?: File | AttachmentCreateInterface | null
  uuid?: string
}

export interface RespondentInterface extends BaseInterface {
  name: string | null
  address: string
  ownerAddress: string | null
  ownerCity: string | null
  ownerState: string | null
  ownerZIP: string | null
  shortId: string
  parentId: string
  Petition?: PetitionInterface
  Response?: ResponseInterface
}

export interface RespondentCreateInterface extends Omit<RespondentInterface, 'uuid' | 'shortId' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  _deleted?: boolean
  shortId?: string
  hasResponded?: boolean
  uuid?: string
}

export interface ResponseInterface extends BaseInterface {
  response: boolean
  parentId: string
  shortId: string
}

export interface ResponseCreateInterface extends Omit<ResponseInterface, 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  _deleted?: boolean
  uuid?: string
}

export interface AttachmentInterface extends BaseInterface {
  parentId: string
  fileType: 'pdf' | 'jpeg'
}

export interface AttachmentCreateInterface extends Omit<AttachmentInterface, 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  _deleted?: boolean
  uuid?: string
}

export interface InforAddressInterface {
  name: string | null
  address: string
  ownerAddress: string | null
  ownerCity: string | null
  ownerState: string | null
  ownerZIP: string | null
  addrkey: string
}

export interface ServerResponse { // Server response object
  success: boolean
  msg?: string
}

interface BaseInterface {
  uuid: string
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
}