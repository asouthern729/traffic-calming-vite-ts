import { infoPopup, errorPopup } from "../../../utils/Toast/Toast"
import { logoutUser } from "../../../context/User/UserActions"

// Types
import { HandleLogoutClick, SetHeaderBtnsProps } from './types'
import { ReactElement } from "react"

// Components
import HeaderBtn from "../../buttons/nav/HeaderBtn/HeaderBtn"

export const handleLogoutClick = async (navigate: HandleLogoutClick['navigate'], dispatch: HandleLogoutClick['dispatch']): Promise<void> => { // Remove user cookie on btn click and navigate to Login page
  const response = await logoutUser()

  if(response.success) {
    dispatch({ type: 'SET_USER', payload: undefined }) // Reset User ctx
    infoPopup('Logged Out')
    return navigate('/')
  } else errorPopup()
}

export const setHeaderBtns = (showMenu: SetHeaderBtnsProps['showMenu'], loggedIn: SetHeaderBtnsProps['loggedIn'], options: SetHeaderBtnsProps['options']): ReactElement | undefined => { // Set header buttons
  const { navigate, userDispatch } = options

  if(showMenu) {
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
              handleClick={() => handleLogoutClick(navigate, userDispatch)} />
          </>
        ):(
          <HeaderBtn
            label={'Staff Login'}
            handleClick={() => navigate('/login')} />
        )}
      </>
    )
  }
}