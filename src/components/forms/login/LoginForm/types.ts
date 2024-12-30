// Types
import { NavigateFunction } from 'react-router-dom'

export interface LoginFormUseFormUseForm { // LoginForm useForm state object
  email: string,
  password: string
}

export interface OnSubmitProps { // onSubmit fn props
  formData: LoginFormUseFormUseForm
  navigate: NavigateFunction
  cookies: {
    userPreferences?: {
      showExpired: boolean
      showAchieved: {
        firstMilestone: boolean
        secondMilestone: boolean
      }
    }
  }
}