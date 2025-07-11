import { PetitionProvider } from "@/components/petitions/context"
import { useGetPetition } from "./hooks"

// Types
import * as AppTypes from '@/context/App/types'

// Components
import Layout from "@/components/layout/Layout"
import HandleLoading from "@/utils/HandleLoading"
import FormContainer from "@/components/form-elements/FormContainer"
import UpdatePetitionForm from "@/components/petitions/forms/update/UpdatePetitionForm"
import ErrorBoundary from "../../components/error/ErrorBoundary"

function Update() {
  const { data, isSuccess } = useGetPetition()

  return ( 
    <Layout>
      <HandleLoading isSuccess={isSuccess}>
        <ErrorBoundary href={'/petitions'}>
          <PetitionProvider>
            <div className="my-10 w-full xl:w-9/10 xl:m-auto xl:my-10 2xl:w-3/4">
              <FormContainer>
                <UpdatePetitionForm petition={data?.data as AppTypes.PetitionInterface} />
              </FormContainer>
            </div>
          </PetitionProvider>
        </ErrorBoundary>
      </HandleLoading>
    </Layout>
  )
}

export default Update