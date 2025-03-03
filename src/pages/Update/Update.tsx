import { useNavigate } from "react-router-dom"
import { useGetPetition } from "./hooks"

// Types
import { Petition } from "../../context/App/types"

// Components
import Layout from "../../components/layout/Layout/Layout"
import HandleLoading from "../../utils/HandleLoading/HandleLoading"
import FormContainer from "../../components/forms/FormContainer/FormContainer"
import UpdatePetitionForm from "../../components/forms/update/UpdatePetitionForm/UpdatePetitionForm"
import ErrorBoundary from "../../components/error/ErrorBoundary/ErrorBoundary"

function Update() {
  const { data, isSuccess } = useGetPetition()

  const navigate = useNavigate()

  return ( 
    <Layout>
      <HandleLoading
        isSuccess={isSuccess}>
        <ErrorBoundary>
          <FormContainer>
            <UpdatePetitionForm 
              petition={data?.data as Petition}
              handleCancelBtnClick={() => navigate('/staff')} />
          </FormContainer>
        </ErrorBoundary>
      </HandleLoading>
    </Layout>
  )
}

export default Update