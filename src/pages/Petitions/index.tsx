import { PetitionProvider } from "@/components/petitions/context"
import { useGetPetitions } from "./hooks"

// Components
import Layout from "@/components/layout/Layout"
import HandleLoading from "@/utils/HandleLoading"
import PetitionsContainer from "../../components/petitions/containers/PetitionsContainer"
import ErrorBoundary from "@/components/error/ErrorBoundary"

function Petitions() {
  const { data, isSuccess } = useGetPetitions()

  return (
    <Layout>
      <ErrorBoundary href={'/public'}>
        <HandleLoading isSuccess={isSuccess}>
          <PetitionProvider>
            <PetitionsContainer petitions={data?.data || []} />
          </PetitionProvider>
        </HandleLoading>
      </ErrorBoundary>
    </Layout>
  )
}

export default Petitions