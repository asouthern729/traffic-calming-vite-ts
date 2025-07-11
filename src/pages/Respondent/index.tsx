import { useGetRespondent } from './hooks'

// Components
import Layout from '@/components/layout/Layout'
import HandleLoading from '@/utils/HandleLoading'
import { VerifyRespondent } from './components'

function Respondent() {
  const { data, isSuccess } = useGetRespondent()

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