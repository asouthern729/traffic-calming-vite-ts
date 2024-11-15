import { useHandlePageLoad } from '../../helpers'
import { useGetRespondent, useVerifyPetition } from '.'

// Types
import { Respondent as RespondentType } from '../../context/App/types'

// Components
import Layout from '../../components/layout/Layout/Layout'
import HandleLoading from '../../utils/HandleLoading/HandleLoading'

function Respondent() {
  const { data, isSuccess } = useGetRespondent()

  useHandlePageLoad()

  return (
    <Layout>
      <HandleLoading isSuccess={isSuccess}>
        {useVerifyPetition(data?.data as RespondentType || undefined, { error: data?.msg })}
      </HandleLoading>
    </Layout>
  )
}

export default Respondent