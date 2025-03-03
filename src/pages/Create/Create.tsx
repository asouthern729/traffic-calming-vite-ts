import { useNavigate } from "react-router-dom"
import { useValidateUser, useHandlePageLoad } from "../../helpers"

// Components
import Layout from "../../components/layout/Layout/Layout"
import FormContainer from "../../components/forms/FormContainer/FormContainer"
import ErrorBoundary from "../../components/error/ErrorBoundary/ErrorBoundary"
import CreatePetitionForm from "../../components/forms/create/CreatePetitionForm/CreatePetitionForm"

function Create() {
  useValidateUser()

  useHandlePageLoad()

  const navigate = useNavigate()

  return (
    <Layout>
      <ErrorBoundary>
        <FormContainer>
          <CreatePetitionForm handleCancelBtnClick={() => navigate('/staff')} />
        </FormContainer>
      </ErrorBoundary>
    </Layout>
  )
}

export default Create