import { API_URL as baseUrl } from '../../config'

// Types
import * as AppTypes from '@/context/App/types'

// Get petitions
// GET /api/v2/eng/traffic-calming/petition
export const getPetitions = async (): Promise<AppTypes.ServerResponse & { data: AppTypes.PetitionInterface[] }> => {
  const res = await fetch(`${ baseUrl }/petition`)

  return res.json()
}

// Get petition
// GET /api/v2/eng/traffic-calming/petition/:uuid
export const getPetition = async (uuid: string): Promise<AppTypes.ServerResponse & { data: AppTypes.PetitionInterface }> => {
  const res = await fetch(`${ baseUrl }/petition/${ uuid }`)

  return await res.json()
}

// Create petition
// POST /api/v2/eng/traffic-calming/petition
export const createPetition = async (formData: AppTypes.PetitionCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.PetitionInterface }> => {
  headers.append('Content-Type', 'application/json')
  
  const res = await fetch(`${ baseUrl }/petition`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update peition
// PUST /api/v2/eng/traffi-calming/petition/:uuid
export const updatePetition = async (formData: AppTypes.PetitionCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/petition/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete petition
// DELETE /api/v2/eng/traffic-calming/petition/:uuid
export const deletePetition = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/petition/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Create respondent
// POST /api/v2/eng/traffic-calming/respondent
export const createRespondents = async (newRespondents: AppTypes.RespondentCreateInterface[], headers: Headers): Promise<AppTypes.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/respondent`, {
    method: 'POST',
    headers,
    body: JSON.stringify(newRespondents)
  })

  return await res.json()
}

// Update respondent
// PUT /api/v2/eng/traffic-calming/respondent/:uuid
export const updateRespondent = async (formData: AppTypes.RespondentCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/respondent/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete respondent
// DELETE /api/v2/eng/traffic-calming/respondent/:uuid
export const deleteRespondent = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/respondent/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return res.json()
}

// Verify respondent
// GET /api/v2/eng/traffic-calming/respondent/id/:shortId
export const verifyRespondent = async (shortId: string): Promise<AppTypes.ServerResponse & { data?: AppTypes.RespondentInterface }> => {
  const res = await fetch(`${ baseUrl }/respondent/id/${ shortId }`)

  return res.json()
}

// Search addresses by ADDRKEY
// POST /api/v2/eng/traffic-calming/respondent/search
export const searchByADDRKEY = async (addrkeys: string[], headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.InforAddressInterface[] }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/respondent/search`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ addrkeys })
  })

  return res.json()
}

// Create response
// POST /api/v2/eng/traffic-calming/response
export const createResponse = async (formData: AppTypes.ResponseCreateInterface): Promise<AppTypes.ServerResponse & { data: AppTypes.ResponseInterface }> => {
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
// POST /api/v2/eng/traffic-calming/respondent/template
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
// POST /api/v2/eng/traffic-calming/attachment
export const createAttachment = async (formData: FormData, headers: Headers): Promise<AppTypes.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/attachment`, {
    method: 'POST',
    headers,
    body: formData
  })

  return await res.json()
}

// Delete attachment
// DELETE /api/v2/dept-purchasing/attachment/:uuid
export const deleteAttachment = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/attachment/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Download attachment
// GET /api/v2/eng/traffic-calming/attachment/:uuid
export const getAttachment = async (uuid: string): Promise<{ success: boolean, data: {
  parentId: string, data: { data: ArrayBuffer, type: string }, fileType: 'pdf' | 'jpeg' } }> => {
  const res = await fetch(`${ baseUrl }/attachment/${ uuid }`)

  return await res.json()
}