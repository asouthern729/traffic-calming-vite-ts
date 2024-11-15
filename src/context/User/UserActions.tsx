import { LDAP_URL as ldapUrl } from "../../config"

// Types
import { ServerResponse } from "../App/types"
import { ValidateTokenResponse, LoginForm } from './types'

// Login user
// POST /api/v1/ldap/auth
export const loginUser = async (formData: LoginForm): Promise<ServerResponse> => {
  const res = await fetch(`${ ldapUrl }/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Logout user
// GET /api/v1/ldap/expire
export const logoutUser = async (): Promise<ServerResponse> => {
  const res = await fetch(`${ ldapUrl }/expire`)

  return await res.json()
}

// Validate token
// GET /api/v1/ldap/validate
export const validateToken = async (): Promise<ValidateTokenResponse> => {
  const res = await fetch(`${ ldapUrl }/validate`, {
    credentials: 'include'
  })

  return await res.json()
}

// Refresh token
// GET /api/v1/ldap/refresh
export const refreshToken = async (): Promise<ValidateTokenResponse> => {
  const res = await fetch(`${ ldapUrl }/refresh`, {
    credentials: 'include'
  })

  return await res.json()
}