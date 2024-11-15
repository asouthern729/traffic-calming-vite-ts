import { useContext } from 'react'
import AppContext from '../../../../context/App/AppContext'
import { setHeaderBtnStyle } from '.'

// Types
import { HeaderBtnProps } from "./types"

function HeaderBtn({ label, handleClick }: HeaderBtnProps) {
  const { activePage } = useContext(AppContext)

  return (
    <button
      type="button"
      onClick={handleClick}
      className={setHeaderBtnStyle(activePage, label)}>
        {label}
    </button>
  )
}

export default HeaderBtn