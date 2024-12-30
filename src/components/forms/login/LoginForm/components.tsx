import { useFormContext } from "react-hook-form"
import styles from './LoginForm.module.css'

// Types
import { LoginFormUseFormUseForm } from "./types"

// Components
import FormError from "../../FormError/FormError"

export const EmailInput = () => { // Email input
  const methods = useFormContext<LoginFormUseFormUseForm>()

  return (
    <div className={styles.inputSection}>
      <div className="flex flex-col">
        <label htmlFor="email" className={styles.label}>Email</label>
        <input 
          { ...methods.register('email', {
            required: 'Email is required',
            onBlur: () => methods.trigger('email')
          }) }
          type="email" 
          className={styles.input} />
      </div>
      <FormError field={'email'} />
    </div>
  )
}

export const PasswordInput = () => { // Password input
  const methods = useFormContext<LoginFormUseFormUseForm>()

  return (
    <div className={styles.inputSection}>
      <div className="flex flex-col">
        <label htmlFor="password" className={styles.label}>Password</label>
        <input 
          { ...methods.register('password', {
            required: 'Password is required'
          }) }
          type="password" 
          className={styles.input} />
      </div>
    </div>
  )
}