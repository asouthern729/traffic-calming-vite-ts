import { FormProvider } from 'react-hook-form'
import { useCreateResponseForm } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import BackToHomeBtn from '@/components/layout/buttons/nav/BackToHomeBtn'
import * as Components from './components'

function CreateResponseForm({ respondent }: { respondent: AppTypes.RespondentInterface }) {
  const methods = useCreateResponseForm(respondent)

  return (
    <FormProvider { ...methods }>
      <form>
        <div className="flex flex-col gap-8 py-8 m-auto xl:w-2/3 xxl:w-1/2">
          <div className="relative flex flex-col items-center font-[play] p-4 bg-neutral shadow-xl lg:p-6">
            <div className="flex flex-col items-center gap-2 text-neutral-content text-2xl pb-6 w-full">
              <Components.ResponseHeader respondent={respondent} />
              <Components.PetitionDescription petition={respondent.Petition} />
            </div>

            <Components.AttachmentBtn respondent={respondent} />
            <Components.EmailLink />
          </div>

          <Components.Buttons petition={respondent.Petition} />
          <BackToHomeBtn />
        </div>
      </form>
    </FormProvider>
  )
}

export default CreateResponseForm