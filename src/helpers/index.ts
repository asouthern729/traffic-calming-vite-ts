import { useState, useEffect, useContext, useCallback, useMemo } from "react"
import { useQuery } from "react-query"
import { useLocation, useNavigate } from "react-router-dom"
import AppContext from "../context/App/AppContext"
import UserContext from "../context/User/UserContext"
import { validateToken, refreshToken } from "../context/User/UserActions"
import { savedPopup, errorPopup } from "../utils/Toast/Toast"

// Types
import { UseQueryResult } from "react-query"
import { Page } from "../context/App/types"
import { ValidateTokenResponse } from "../context/User/types"
import { UpdateRespondentFormUseForm } from "../components/forms/update/UpdateRespondentForm/types"
import { UseHandlePageData, HandleSuccessfulFormSubmitProps, HandleDeleteBtnClickProps, SetBlobURLProps } from "./types"

export const useValidateUser = (): { isAuthenticated: boolean, isLoading: boolean } => { // Validate user
  const [state, setState] = useState<{ retries: number }>({ retries: 0 })
  const { dispatch } = useContext(UserContext)

  const navigate = useNavigate()

  const validateToken = useValidateToken()

  const tryRefresh = validateToken.isSuccess && !validateToken.data?.success

  const refreshToken = useRefreshToken(tryRefresh, state.retries)

  const isAuthenticated = (validateToken.isSuccess && validateToken.data?.success) || 
  (refreshToken.isSuccess && refreshToken.data?.success)

  const isLoading = validateToken.isLoading || refreshToken.isLoading

  useEffect(() => {
    if(isAuthenticated) {
      const userData = validateToken.data?.success 
        ? validateToken.data?.data 
        : refreshToken.data?.data
        
      dispatch({ type: 'SET_USER', payload: userData })
      setState({ retries: 0 }) // Reset retries state on success
    }
  }, [isAuthenticated, validateToken.data, refreshToken.data, dispatch])

  useEffect(() => {
    if(refreshToken.isSuccess && !refreshToken.data?.success) {
      if(state.retries >= 5) {
        dispatch({ type: 'SET_USER', payload: undefined })
        navigate('/login')
      } else {
        setState(prevState => ({ retries: prevState.retries + 1 }))
      }
    }
  }, [refreshToken.isSuccess, refreshToken.data, state.retries, dispatch, navigate])

  return { isAuthenticated, isLoading }
}

export const useEnableQuery = (isAuthenticated: boolean, isLoading: boolean) => {
  const [state, setState] = useState<{ enabled: boolean }>({ enabled: false })

  const isReady = isAuthenticated && !isLoading

  useEffect(() => {
    let timeout = null

    if(isReady) {
      timeout = setTimeout(() => {
        setState({ enabled: true })
      }, 300) // 300ms delay
    } else setState({ enabled: false })

    return () => {
      if(timeout) {
        clearTimeout(timeout)
      }
    }
  }, [isReady])

  return state.enabled
}

export const useHandlePageData = (data: UseHandlePageData['data'], currentPage: UseHandlePageData['currentPage']): UpdateRespondentFormUseForm[] => { // Handle page change
  const pageData = useMemo(() => {
    return data.slice((currentPage * 20) - 20, currentPage * 20)
  }, [data, currentPage])

  return pageData
}

export const useHandlePageLoad = () => { // Set current page and reset ctx on page change
  const { dispatch } = useContext(AppContext)

  const location = useLocation()

  const cb = useCallback(() => {
    let page: Page = 'Public'

    switch(location.pathname.split('/')[1]) {
      case 'create':
        page = 'Create Petition'
        break
      case 'staff':
        page = 'Manage Petitions'
        break
      case 'update':
        page = 'Manage Petitions'
        break
      default:
        page = 'Public'
    }

    dispatch({ type: 'RESET_CTX', payload: undefined })
    dispatch({ type: 'SET_ACTIVE_PAGE', payload: page })
  }, [location, dispatch])

  useEffect(() => { // Reset ctx and update current page in ctx on page change
    cb()
  }, [cb])
}

export const setDateForForm = (date: Date | string | undefined): string | undefined => { // Format date from server for react hook form
  if(date === null || date === undefined) {
    return undefined
  }

  const dateObj = typeof date === 'string' || typeof date === 'function' ? new Date(date) : date

  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')

  return `${ year }-${ month }-${ day }`
}

export const handleSuccessfulFormSubmit = async (msg: HandleSuccessfulFormSubmitProps['msg'], options: HandleSuccessfulFormSubmitProps['options']): Promise<void> => { // Handle successful form submit
  const { invalidateQuery, navigate, resetState } = options

  savedPopup(msg)

  if(invalidateQuery) { // Invalidate query
    await invalidateQuery()
  }

  if(resetState) { // Reset component state
    resetState()
  } 

  if(navigate) { // Navigate
    navigate()
  }
}

export const handleDeleteBtnClick = async (uuid: HandleDeleteBtnClickProps['uuid'], deleteBtnActive: HandleDeleteBtnClickProps['deleteBtnActive'], deleteFn: HandleDeleteBtnClickProps['deleteFn'], options: HandleDeleteBtnClickProps['options']): Promise<void> => { // Handle delete button click
  const { setState, resetState, invalidateQuery, setFormState } = options 

  if(!deleteBtnActive && setState) {
    setState(prevState => ({ ...prevState, deleteBtnActive: true }))
  } else {
    const result = await deleteFn(uuid)

    if(result.success) {
      if(setFormState) { // Update form state if applicable
        setFormState()
      }

      handleSuccessfulFormSubmit(result.msg as string, { invalidateQuery, resetState })
    } else errorPopup(result.msg)
  }
}

export const setBlobURL = (buffer: SetBlobURLProps['buffer'], type: SetBlobURLProps['type'], options: SetBlobURLProps['options']): void => {
  const { setState } = options
  
  const bufferView = new Uint8Array(buffer)

  const blob = new Blob([bufferView], { type })
  const blobURL = URL.createObjectURL(blob)

  setState(prevState => ({ ...prevState, blobURL }))
}

const useValidateToken = (): UseQueryResult<ValidateTokenResponse> => { // Handle token validation
  return useQuery('validateToken', () => validateToken())
}

const useRefreshToken = (refresh: boolean | undefined, retries: number): UseQueryResult<ValidateTokenResponse> => { // Handle token refresh
  return useQuery(['refreshToken', retries], () => refreshToken(), { enabled: refresh })
}