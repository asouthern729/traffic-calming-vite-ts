import { useContext } from "react"
import { useLocation } from "react-router-dom"
import AppContext from "../../../context/App/AppContext"

// Components
import MenuBtn from "../../buttons/nav/MenuBtn/MenuBtn"
import { Buttons } from "./components"

function HeaderBtnsContainer() {
  const { showMenu, dispatch } = useContext(AppContext)

  const pathname = useLocation().pathname

  if(pathname === '/login') return null

  return (
    <div className="flex space-evenly ml-auto">
      <Buttons />
      <MenuBtn
        handleClick={() => dispatch({ type: 'OPEN_CLOSE_SHOW_MENU', payload: !showMenu })}
        active={showMenu} />
    </div>
  )
}

export default HeaderBtnsContainer