import { useEffect, useContext, useCallback, useRef } from "react"
import AppContext from "../../context/App/AppContext"

// Types
import { ReactElement } from "react"

function HandleMenuVisibilityTimer({ children }: { children: ReactElement }) {
  const { showMenu, dispatch } = useContext(AppContext)
  const timerRef = useRef<number | null>(null)

  const resetTimer = useCallback(() => {
    if(timerRef.current !== null) {
      clearTimeout(timerRef.current)
    }
    
    timerRef.current = window.setTimeout(() => {
      if(showMenu) {
        dispatch({ type: 'OPEN_CLOSE_SHOW_MENU', payload: false })
      }
    }, 5000) // 5 seconds
  }, [dispatch, showMenu])

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "click",
      "scroll"
    ]
    
    resetTimer()

    events.forEach(event => {
      window.addEventListener(event, resetTimer)
    })

    return () => {
      if(timerRef.current !== null) {
        clearTimeout(timerRef.current)
      }

      events.forEach(event => {
        window.removeEventListener(event, resetTimer)
      })
    }
  }, [resetTimer])

  return children
}

export default HandleMenuVisibilityTimer