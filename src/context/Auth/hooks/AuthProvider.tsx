import { PublicClientApplication } from "@azure/msal-browser"
import { MsalProvider } from "@azure/msal-react"
import { msalConfig } from "../config"

// Types
import { ReactNode } from "react"
import { AuthenticationResult, EventType } from "@azure/msal-browser"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const msalInstance = new PublicClientApplication(msalConfig)

  if(!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0])
  }
  
  msalInstance.addEventCallback((event) => {
    const authenticationResult = event.payload as AuthenticationResult
    const account = authenticationResult?.account

    if(event.eventType === EventType.LOGIN_SUCCESS && account) {
      msalInstance.setActiveAccount(account)
    }
  })

  return <MsalProvider instance={msalInstance}>
    {children}
  </MsalProvider>
}

export const useAuthProvider = () => {
  return { AuthProvider }
}