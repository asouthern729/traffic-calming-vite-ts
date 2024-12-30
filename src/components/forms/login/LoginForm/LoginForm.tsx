import { useNavigate } from "react-router-dom"
import { FormProvider } from "react-hook-form"
import image from '../../../../assets/icons/cof/cof.jpeg'
import { useLoginForm, onSubmit } from '.'
import styles from './LoginForm.module.css'

// Components
import LoginBtn from "../../../buttons/forms/LoginBtn/LoginBtn"
import { EmailInput, PasswordInput } from "./components"

function LoginForm() {
  const navigate = useNavigate()

  const methods = useLoginForm()

  return (
    <div className={styles.container}>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => onSubmit(formData, navigate))}>

          <img src={image} alt="cof logo" className="w-fit hidden lg:block" />

          <div className={styles.body}>

            <h1 className={styles.title}>Engineering Dept Login</h1>
            
            <EmailInput />
            <PasswordInput />

            <div className="flex flex-col mt-8 gap-3">
              <LoginBtn disabled={!methods.formState.isValid || methods.formState.isSubmitting && true} />
            </div>
          </div>

        </form>
      </FormProvider>
      

    </div>
  )
}

export default LoginForm