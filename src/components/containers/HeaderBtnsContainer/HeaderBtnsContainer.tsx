import { useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import AppContext from "../../../context/App/AppContext"
import UserContext from "../../../context/User/UserContext"
import { setHeaderBtns } from "../../layout/Header"

// Components
import MenuBtn from "../../buttons/nav/MenuBtn/MenuBtn"

function HeaderBtnsContainer() {
  const { showMenu, dispatch } = useContext(AppContext)
  const { user, dispatch: userDispatch } = useContext(UserContext)

  const navigate = useNavigate()

  const pathname = useLocation().pathname

  return (
    <>
      {pathname !== '/login' && (

        <div className="flex space-evenly ml-auto">
          {setHeaderBtns(showMenu, user?.email ? true : false, { navigate, userDispatch })}

          <MenuBtn
            handleClick={() => dispatch({ type: 'OPEN_CLOSE_SHOW_MENU', payload: !showMenu })}
            active={showMenu} />
        </div>

      )}
    </>
  )
}

export default HeaderBtnsContainer