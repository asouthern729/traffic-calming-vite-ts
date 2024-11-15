import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { Link } from "react-router-dom"
import { useQueryClient } from "react-query"
import { setFormLabelProps } from "../../FormLabel"
import { setDeleteBtnProps } from "."
import styles from '../../Forms.module.css'

// Types
import { UpdatePetitionFormUseForm } from "../UpdatePetitionForm/types"
import { UpdateRespondentFormProps, UpdateRespondentFormState, StateAbbreviations } from "./types"

// Components
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"
import DeleteBtn from "../../../buttons/forms/DeleteBtn/DeleteBtn"

function UpdateRespondentForm({ index }: UpdateRespondentFormProps) {
  const [state, setState] = useState<UpdateRespondentFormState>({ deleteBtnActive: false })

  const methods = useFormContext<UpdatePetitionFormUseForm>()

  const queryClient = useQueryClient()

  const hasResponded = methods.getValues(`respondents.${ index }.hasResponded`)
  const shortId = methods.getValues(`respondents.${ index }.shortId`)
  const uuid = methods.getValues(`respondents.${ index }.uuid`)
  const parentId = methods.getValues('uuid')

  return (
    <div className="flex flex-col bg-neutral/50 p-4 lg:p-10">

      <div className={`flex gap-4 justify-between pb-1 xl:ml-auto xl:justify-normal ${ hasResponded ? styles.hasResponded : styles.awaitingResponse}`}>
        <Link to={`/respondent?shortId=${ shortId }`} className={`text-secondary text-center hover:text-warning ${ hasResponded ? 'hidden' : null }`}>Respondent ID: {shortId}</Link>
        <span className="text-center">{hasResponded ? 'Responded' : 'Awaiting Response'}</span>
      </div>

      <div className={styles.body}>

        <div className="flex gap-4 flex-wrap">

          <div className={styles.inputSection}>
            <div className="flex">
              <FormLabel { ...setFormLabelProps({ label: 'Name:', name: `respondents.${ index }.name` }) } />
              <input 
                type="text"
                className={styles.input}
                { ...methods.register(`respondents.${ index }.name`, {
                  maxLength: {
                    value: 255,
                    message: 'Name must be 255 characters or less'
                  }
                }) } />
            </div>
            <FormError field={`respondents.${ index }.name`} />
          </div>

          <div className={styles.inputSection}>
            <div className="flex">
              <FormLabel { ...setFormLabelProps({ label: 'Address', name: `respondents.${ index }.address`, required: true }) } />
              <input 
                type="text"
                className={styles.input}
                { ...methods.register(`respondents.${ index }.address`, {
                  required: 'Address is required',
                  maxLength: {
                    value: 255,
                    message: 'Address must be 255 characters or less'
                  },
                  onBlur: () => methods.trigger(`respondents.${ index }.address`)
                }) } />
            </div>
            <FormError field={`respondents.${ index }.address`} />
          </div>

        </div>

        <div className="flex gap-3 flex-wrap">

          <div className="flex-1 flex flex-col gap-2">
            <div className="flex">
              <FormLabel { ...setFormLabelProps({ label: 'Owner Address:', name: `respondents.${ index }.ownerAddress` }) } />
              <input 
                type="text"
                className={styles.input}
                { ...methods.register(`respondents.${ index }.ownerAddress`, {
                  maxLength: {
                    value: 255,
                    message: 'Owner address must be 255 characters or less'
                  }
                }) } />
            </div>
            <FormError field={`respondents.${ index }.ownerAddress`} />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <div className="flex">
              <FormLabel { ...setFormLabelProps({ label: 'Owner City:', name: `respondents.${ index }.ownerCity` }) } />
              <input 
                type="text"
                className={styles.input}
                { ...methods.register(`respondents.${ index }.ownerCity`, {
                  maxLength: {
                    value: 50,
                    message: 'Owner city must be 50 characters or less'
                  }
                }) } />
            </div>
            <FormError field={`respondents.${ index }.ownerCity`} />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <div className="flex">
              <FormLabel { ...setFormLabelProps({ label: 'Owner State:', name: `respondents.${ index }.ownerState` }) } />
              <select 
                className={styles.input}
                { ...methods.register(`respondents.${ index }.ownerState`) }>
                  <option value=""></option>
                  {Object.values(StateAbbreviations).map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <div className="flex">
              <FormLabel { ...setFormLabelProps({ label: 'Owner ZIP:', name: `respondents.${ index }.ownerZIP` }) } />
              <input 
                type="text"
                className={styles.input}
                { ...methods.register(`respondents.${ index }.ownerZIP`, {
                  maxLength: {
                    value: 5,
                    message: 'Owner ZIP must be 5 characters'
                  },
                  minLength: {
                    value: 5,
                    message: 'Owner ZIP must be 5 characters'
                  }
                }) } />
            </div>
            <FormError field={`respondents.${ index }.ownerZIP`} />
          </div>

        </div>

      </div>

      <div className="mx-auto pt-10">
        <DeleteBtn { ...setDeleteBtnProps(state.deleteBtnActive, hasResponded, uuid, { setState, invalidateQuery: () => queryClient.invalidateQueries(['getPetition', parentId]) }) } />
      </div>
      
    </div>
  )
}

export default UpdateRespondentForm