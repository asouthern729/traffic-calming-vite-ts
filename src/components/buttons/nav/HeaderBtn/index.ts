import styles from './HeaderBtn.module.css'

// Types
import { SetHeaderBtnStyleProps, SetHeaderBtnProps } from "./types"

export const setHeaderBtnStyle = (activePage: SetHeaderBtnStyleProps['activePage'], label: SetHeaderBtnStyleProps['label']): string => { // Set button style based on current active page
  if(label === activePage) { // Active page
    return styles.activeBtn
  }

  return styles.btn
}

export const setBtnProps = (props: SetHeaderBtnProps['props']) => { // Set btn props
  return { ...props }
}