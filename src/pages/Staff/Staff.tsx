import { useHandlePageLoad, useValidateUser } from "../../helpers"
import { useGetPetitions } from "./hooks"

// Components
import Layout from "../../components/layout/Layout/Layout"
import HandleLoading from "../../utils/HandleLoading/HandleLoading"
import PetitionsContainer from "../../components/containers/PetitionsContainer/PetitionsContainer"
import ErrorBoundary from "../../components/error/ErrorBoundary/ErrorBoundary"

function Staff() {
  const validated = useValidateUser()

  useHandlePageLoad()

  const { data, isSuccess } = useGetPetitions(validated)

  return (
    <Layout>
      <HandleLoading
        isSuccess={isSuccess}>
          <ErrorBoundary>
            <PetitionsContainer petitions={data?.data || []} />
          </ErrorBoundary>
        </HandleLoading>
    </Layout>
  )
}

export default Staff