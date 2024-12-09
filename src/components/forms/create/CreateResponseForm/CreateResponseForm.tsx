import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormProvider } from 'react-hook-form'
import icon from '../../../../assets/icons/house/house.svg'
import cofIcon from '../../../../assets/icons/cof/cof.svg'
import { useCreateResponseForm, useGetAttachment, setVoteBtnProps } from '.'
import styles from './CreateResponseForm.module.css'

// Types
import { CreateResponseFormProps, CreateResponseFormState, AttachmentState } from './types'

// Components
import VoteBtn from '../../../buttons/forms/VoteBtn/VoteBtn'
import { SetAttachment } from '.'

function CreateResponseForm({ respondent }: CreateResponseFormProps) {
  const [state, setState] = useState<CreateResponseFormState>({ voteNoBtnActive: false, voteYesBtnActive: false })
  const [attachment, setAttachment] = useState<AttachmentState>({ blobURL: undefined, type: null })

  const methods = useCreateResponseForm(respondent)

  useGetAttachment(respondent.Petition.PetitionAttachment?.uuid, { setAttachment })

  const navigate = useNavigate()

  return (
    <>
      <FormProvider { ...methods }>
        <form>

          <div className="flex flex-col gap-8 py-8 m-auto xl:w-2/3 xxl:w-1/2">
            <section className={styles.container}>
              <img src={cofIcon} className={styles.cofIcon} />
              <div className={styles.header}>
                <img src={icon} alt="house icon" className={styles.houseIcon} />
                <div className="text-lg lg:text-2xl">{respondent.address}</div>
                <div className="flex flex-col gap-6 p-6 pt-4 m-2 bg-secondary/10 items-center w-full lg:p-10 lg:m-4 lg:text-lg">
                  <div className="flex flex-col gap-1 items-center">
                    <div className="text-warning text-lg uppercase font-bold lg:text-2xl">Petition {respondent.Petition.petitionId}</div>
                    <small className="text-neutral-content font-light badge">Closes {respondent.Petition.endDate}</small>
                  </div>
                  <p className="italic text-sm text-center leading-relaxed lg:text-lg">{respondent.Petition.description}</p>
                </div>
              </div>

              {attachment.blobURL && (
                <SetAttachment
                  blobURL={attachment.blobURL}
                  type={attachment.type} />
              )}

              <p className="text-neutral-content text-sm text-center pt-8 w-3/4 lg:text-lg">Please direct any questions or comments regarding this traffic calming petition to <a href="mailto:tocmail@franklintn.gov" className="text-info" target="_blank">tocmail@franklintn.gov</a></p>
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