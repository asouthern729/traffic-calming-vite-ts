import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormProvider } from 'react-hook-form'
import { useCreateResponseForm, setVoteBtnProps } from '.'
import icon from '../../../../assets/icons/house/house.svg'
import styles from './CreateResponseForm.module.css'

// Types
import { CreateResponseFormProps, CreateResponseFormState } from './types'

// Components
import VoteBtn from '../../../buttons/forms/VoteBtn/VoteBtn'

function CreateResponseForm({ respondent }: CreateResponseFormProps) {
  const [state, setState] = useState<CreateResponseFormState>({ voteNoBtnActive: false, voteYesBtnActive: false })

  const methods = useCreateResponseForm(respondent)

  const navigate = useNavigate()

  return (
    <>
      <FormProvider { ...methods }>
        <form>

          <div className="flex flex-col gap-8 mb-8 py-8 m-auto xl:w-1/2">
            <section className={styles.container}>
              <div className={styles.header}>
                <img src={icon} alt="house icon" className={styles.houseIcon} />
                {respondent.address}
                <p className="italic indent-4 text-sm p-6 m-2 bg-secondary/10 lg:p-10 lg:m-4 lg:text-lg">{respondent.Petition.description}</p>
              </div>
            </section>

            <div className="flex flex-col gap-4 w-full">
              <VoteBtn { ...setVoteBtnProps('VoteNo', state, { setState, methods, navigate: () => navigate('/') }) } />
              <VoteBtn { ...setVoteBtnProps('VoteYes', state, { setState, methods, navigate: () => navigate('/') }) } />
            </div>
          </div>

        </form>
      </FormProvider>
    </>
  )
}

export default CreateResponseForm