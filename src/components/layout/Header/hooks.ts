import { useContext, useMemo } from "react"
import { useLocation } from "react-router"
import HeaderCtx from "./context"

export const useSetHeaderLinkHref = () => {
  const pathname = useLocation().pathname

  if(!pathname.includes('petitions')) {
    const href = '/petitions'
    const label = 'Manage Petitions'

    return { href, label }
  }

  const href = '/public'
  const label = 'Public'

  return { href, label }
}

export const useHandleTitleVisibility = () => {
  const { expanded } = useContext(HeaderCtx)

  const width = window.innerWidth

  return useMemo(() => {
    if(width >= 1024 || !expanded) {
      return true
    }
    
    return false
  }, [expanded, width])
}