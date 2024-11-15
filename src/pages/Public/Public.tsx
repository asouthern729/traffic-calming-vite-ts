import { useHandlePageLoad } from "../../helpers"

// Components
import Layout from "../../components/layout/Layout/Layout"
import PublicContainer from "../../components/containers/PublicContainer/PublicContainer"
import ErrorBoundary from "../../components/error/ErrorBoundary/ErrorBoundary"

function Public() {
  useHandlePageLoad()

  return (
    <Layout>
      <ErrorBoundary>
        <PublicContainer />
      </ErrorBoundary>
    </Layout>
  )
}

export default Public