import { useHandlePageLoad } from '../../helpers'
import { useGetRespondent } from './hooks'

// Components
import Layout from '../../components/layout/Layout/Layout'
import HandleLoading from '../../utils/HandleLoading/HandleLoading'
import { VerifyRespondent } from './components'

function Respondent() {
  const { data, isSuccess } = useGetRespondent()

  useHandlePageLoad()

  return (
    <Layout>
      <HandleLoading isSuccess={isSuccess}>
        <VerifyRespondent
          respondent={data?.data}
          error={data?.msg} />
      </HandleLoading>
    </Layout>
  )
}

export default Respondent