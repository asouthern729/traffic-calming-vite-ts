import { PetitionProvider } from "@/components/petitions/context"

// Components
import Layout from "@/components/layout/Layout"
import ErrorBoundary from "@/components/error/ErrorBoundary"
import FormContainer from "@/components/form-elements/FormContainer"
import CreatePetitionForm from "@/components/petitions/forms/create/CreatePetitionForm"

function Create() {

  return (
    <Layout>
      <ErrorBoundary href={'/petitions'}>
        <PetitionProvider>
          <div className="my-10 w-full xl:w-9/10 xl:m-auto xl:my-10 2xl:w-3/4">
            <FormContainer>
              <CreatePetitionForm />
            </FormContainer>
          </div>
        </PetitionProvider>
      </ErrorBoundary>
    </Layout>
  )
}

export default Create