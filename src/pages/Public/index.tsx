// Components
import Layout from "@/components/layout/Layout"
import PublicContainer from "@/components/public/containers/PublicContainer"
import ErrorBoundary from "@/components/error/ErrorBoundary"

function Public() {

  return (
    <Layout>
      <ErrorBoundary href={'/public'}>
        <PublicContainer />
      </ErrorBoundary>
    </Layout>
  )
}

export default Public