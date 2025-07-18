import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router"

export const useRedirect = () => { // Redirect user
  const [state, setState] = useState<{ timer: number }>({ timer: 5 })

  const navigate = useNavigate()

  const redirect = useCallback(() => {
    if(state.timer === 0) {
      navigate('/public')
    }
  }, [state.timer, navigate])

  useEffect(() => {
    const interval = setInterval(() => {
      setState(prevState => ({ timer: prevState.timer - 1 }))
    }, 1000)

    redirect()

    return () => clearInterval(interval)
  }, [redirect, navigate])

  return { timer: state.timer }
}