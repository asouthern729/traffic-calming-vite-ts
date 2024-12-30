import { FormProvider } from 'react-hook-form'
import icon from '../../../../assets/icons/house/house.svg'
import cofIcon from '../../../../assets/icons/cof/cof.svg'
import { useCreateResponseForm } from './hooks'
import styles from './CreateResponseForm.module.css'

// Types
import { CreateResponseFormProps } from './types'

// Components
import { Attachment, Buttons } from './components'

function CreateResponseForm({ respondent }: CreateResponseFormProps) {
  const methods = useCreateResponseForm(respondent)

  return (
    <>
      <FormProvider { ...methods }>
        <form>

          <div className="flex flex-col gap-8 py-8 m-auto xl:w-2/3 xxl:w-1/2">

            <div className={styles.container}>

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

              <Attachment respondent={respondent} />

              <p className="text-neutral-content text-sm text-center pt-8 w-3/4 lg:text-lg">Please direct any questions or comments regarding this traffic calming petition to <a href="mailto:tocmail@franklintn.gov" className="text-info" target="_blank">tocmail@franklintn.gov</a></p>
            </div>

            <Buttons />
          </div>

        </form>
      </FormProvider>
    </>
  )
}

export default CreateResponseForm