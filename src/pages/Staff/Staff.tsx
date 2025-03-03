import { useHandlePageLoad } from "../../helpers"
import { useGetPetitions } from "./hooks"

// Components
import Layout from "../../components/layout/Layout/Layout"
import HandleLoading from "../../utils/HandleLoading/HandleLoading"
import PetitionsContainer from "../../components/containers/PetitionsContainer/PetitionsContainer"
import ErrorBoundary from "../../components/error/ErrorBoundary/ErrorBoundary"

function Staff() {
  useHandlePageLoad()

  const { data, isSuccess } = useGetPetitions()

  return (
    <Layout>
      <ErrorBoundary>
        <HandleLoading isSuccess={isSuccess}>
          <PetitionsContainer petitions={data?.data || []} />
        </HandleLoading>
      </ErrorBoundary>
    </Layout>
  )
}

export default Staff