import { useForm } from 'react-hook-form'
import { loginUser } from '../../../../context/User/UserActions'
import { authPopup, errorPopup } from '../../../../utils/Toast/Toast'

// Types
import { UseFormReturn } from 'react-hook-form'
import { LoginFormUseFormState, OnSubmitProps } from './types'

export const useLoginForm = (): UseFormReturn<LoginFormUseFormState> => { // LoginForm useForm
  return useForm<LoginFormUseFormState>({
    defaultValues: {
      email :'',
      password: ''
    }
  })
}

export const onSubmit = async (formData: OnSubmitProps['formData'], navigate: OnSubmitProps['navigate']): Promise<void> => { // Form submit
  const result = await loginUser(formData)
  
  if(result.success) { // On success
    setTimeout(() => {
      navigate('/staff')
    }, 1000)

    return authPopup()
  } else errorPopup(result.msg)
}