import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { handleLogoutClick } from "../../layout/Header/utils"
import UserContext from "../../../context/User/UserContext"
import AppContext from "../../../context/App/AppContext"

// Components
import HeaderBtn from "../../buttons/nav/HeaderBtn/HeaderBtn"

export const Buttons = () => { // Header buttons
  const { showMenu } = useContext(AppContext)
  const { user, dispatch } = useContext(UserContext)

  const navigate = useNavigate()

  const loggedIn = user?.email ? true : false

  if(!showMenu) return null

  return (
    <>
      {loggedIn ? (
        <>
          <HeaderBtn
            label={'Create Petition'}
            handleClick={() => navigate('/create')} />
          <HeaderBtn
            label={'Manage Petitions'}
            handleClick={() => navigate('/staff')} />
          <HeaderBtn
            label={'Logout'}
            handleClick={() => handleLogoutClick(navigate, dispatch)} />
        </>
      ):(
        <HeaderBtn
          label={'Staff Login'}
          handleClick={() => navigate('/login')} />
      )}
    </>
  )
}