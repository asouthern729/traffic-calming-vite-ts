import { API_URL as baseUrl } from '../../config'

// Types
import { CreateResponseFormUseForm } from '../../components/forms/create/CreateResponseForm/types'
import { GetPetitionsResponse, GetPetitionResponse, CreatePetitionResponse, VerifyRespondentResponse, CreateResponseResponse, SearchByADDRKEYResponse, ServerResponse, PetitionObj, RespondentObj, GetAttachmentResponse } from './types'

// Get petitions
// GET /api/v1/eng/traffic-calming/petition
export const getPetitions = async (): Promise<GetPetitionsResponse> => {
  const res = await fetch(`${ baseUrl }/petition`)

  return res.json()
}

// Get petition
// GET /api/v1/eng/traffic-calming/petition/:uuid
export const getPetition = async (uuid: string): Promise<GetPetitionResponse> => {
  const res = await fetch(`${ baseUrl }/petition/${ uuid }`)

  return await res.json()
}

// Create petition
// POST /api/v1/eng/traffic-calming/petition
export const createPetition = async (formData: PetitionObj): Promise<CreatePetitionResponse> => {
  const res = await fetch(`${ baseUrl }/petition`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update peition
// PUST /api/v1/eng/traffi-calming/petition/:uuid
export const updatePetition = async (formData: PetitionObj): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/petition/${ formData.uuid }`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete petition
// DELETE /api/v1/eng/traffic-calming/petition/:uuid
export const deletePetition = async (uuid: string): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/petition/${ uuid }`, {
    method: 'DELETE'
  })

  return await res.json()
}

// Create respondent
// POST /api/v1/eng/traffic-calming/respondent
export const createRespondents = async (newRespondents: RespondentObj[]): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/respondent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newRespondents)
  })

  return await res.json()
}

// Update respondent
// PUT /api/v1/eng/traffic-calming/respondent/:uuid
export const updateRespondent = async (formData: RespondentObj): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/respondent/${ formData.uuid }`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete respondent
// DELETE /api/v1/eng/traffic-calming/respondent/:uuid
export const deleteRespondent = async (uuid: string): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/respondent/${ uuid }`, {
    method: 'DELETE'
  })

  return res.json()
}

// Verify respondent
// GET /api/v1/eng/traffic-calming/respondent/id/:shortId
export const verifyRespondent = async (shortId: string): Promise<VerifyRespondentResponse> => {
  const res = await fetch(`${ baseUrl }/respondent/id/${ shortId }`)

  return res.json()
}

// Search addresses by ADDRKEY
// POST /api/v1/eng/traffic-calming/respondent/search
export const searchByADDRKEY = async (addrkeys: string[]): Promise<SearchByADDRKEYResponse> => {
  const res = await fetch(`${ baseUrl }/respondent/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ addrkeys })
  })

  return res.json()
}

// Create response
// POST /api/v1/eng/traffic-calming/response
export const createResponse = async (formData: CreateResponseFormUseForm): Promise<CreateResponseResponse> => {
  const res = await fetch(`${ baseUrl }/response`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return res.json()
}

// Download template
// POST /api/v1/eng/traffic-calming/respondent/template
export const downloadRespondentTemplate = async (): Promise<void> => {
  const res = await fetch(`${ baseUrl }/respondent/template`, {
    method: 'POST'
  })

  const blob = await res.blob()
  const url = window.URL.createObjectURL(blob)

  const attachment = document.createElement('a')
  attachment.style.display = 'none'
  attachment.href = url
  attachment.download = 'TrafficCalmingTemplate.csv'

  document.body.appendChild(attachment)
  attachment.click() // Starts the download

  document.body.removeChild(attachment)
  window.URL.revokeObjectURL(url)
}

// Create attachment
// POST /api/v1/eng/traffic-calming/attachment
export const createAttachment = async (formData: FormData): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/attachment`, {
    method: 'POST',
    body: formData
  })

  return await res.json()
}

// Delete attachment
// DELETE /api/v2/dept-purchasing/attachment/:uuid
export const deleteAttachment = async (uuid: string): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/attachment/${ uuid }`, {
    method: 'DELETE'
  })

  return await res.json()
}

// Download attachment
// GET /api/v1/eng/traffic-calming/attachment/:uuid
export const getAttachment = async (uuid: string): Promise<GetAttachmentResponse> => {
  const res = await fetch(`${ baseUrl }/attachment/${ uuid }`)

  return await res.json()
}