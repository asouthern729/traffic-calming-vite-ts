import { useContext } from "react"
import { useLocation, Link } from "react-router"
import { useMsal } from "@azure/msal-react"
import HeaderCtx from "./context"
import { APP_TITLE } from '../../../config'
import useHandleLogoutRedirect from "@/context/Auth/hooks/useHandleLogoutRedirect"
import { useSetHeaderLinkHref, useHandleTitleVisibility } from './hooks'

// Icons
import inactiveMenuIcon from '@/assets/icons/menu/menu-light.svg'
import activeMenuIcon from '@/assets/icons/menu/menu.svg'

export const Title = () => {
  const pathname = useLocation().pathname

  const visible = useHandleTitleVisibility()

  if(!visible) return null

  if(pathname === '/') { // Login page
    return (
      <div className="flex flex-col text-primary-content items-start w-fit">
        <h1 className="text-lg font-bold whitespace-nowrap lg:text-2xl">City of Franklin</h1>
        <span className="text-sm ml-6 w-fit lg:text-xl lg:whitespace-nowrap">{APP_TITLE}</span>
      </div>
    )
  }

  return (
    <Link to={'/public'} className="flex flex-col text-primary-content items-start w-fit">
      <h1 className="text-lg font-bold whitespace-nowrap lg:text-2xl">City of Franklin</h1>
      <span className="text-sm ml-6 w-fit lg:text-xl lg:whitespace-nowrap">{APP_TITLE}</span>
    </Link>
  )
}

export const BtnsMenu = ({ children }: { children: React.ReactNode }) => {
  const { expanded, dispatch } = useContext(HeaderCtx)

  return (
    <div className="flex justify-between ml-auto w-full lg:w-fit lg:gap-4">
      {children}
      <button 
        type="button"
        className="flex flex-col justify-center ml-auto w-16 hover:cursor-pointer"
        onClick={() => dispatch({ type: 'TOGGLE_EXPANDED' })}>
          <img src={!expanded ? inactiveMenuIcon : activeMenuIcon} alt="menu icon" className="w-fit" />
      </button>
    </div>
  )
}

export const Buttons = () => {
  const { expanded } = useContext(HeaderCtx)

  const pathname = useLocation().pathname

  const { instance } = useMsal()
  const activeAccount = instance.getActiveAccount()

  // @TODO remove comment for prod
  // if(!activeAccount) return null 

  if(pathname === '/' || !expanded) return null // Hide on login page || !expanded

  return (
    <div className="flex flex-col items-center gap-4 mr-auto md:flex-row md:ml-auto">
      <ManagePetitionsBtn />
      <CreateBtn />
      <LogoutBtn />
    </div>
  )
}

const ManagePetitionsBtn = () => {
  const { href, label } = useSetHeaderLinkHref()

  return (
    <Link 
      to={href}
      className="btn btn-sm btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none lg:btn-lg">
        {label}
    </Link>
  )
}

const CreateBtn = () => {
  const pathname = useLocation().pathname

  if(pathname === '/petitions/create') return null

  return (
    <Link 
      to={'/petitions/create'}
      className="btn btn-sm btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none lg:btn-lg">
        Create Petition
    </Link>
  )
}

const LogoutBtn = () => { // Logout button
  const handleLogoutRedirect = useHandleLogoutRedirect()

  return (
    <button 
      type="button"
      onClick={handleLogoutRedirect}
      className="btn btn-sm btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none lg:btn-lg">
        Logout
    </button>
  )
}