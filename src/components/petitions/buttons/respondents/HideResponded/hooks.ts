import { useLocation } from "react-router"

export const useSetVisibility = () => {
  const pathname = useLocation().pathname

  return pathname !== '/petitions/create'
}