import { useState } from "react"
import { Link } from "react-router-dom"
import { useQueryClient } from "react-query"
import { useUpdateRespondentFormContext } from "./hooks"
import { setDeleteBtnProps } from "./utils"
import styles from '../../Forms.module.css'

// Types
import { UpdateRespondentFormState } from "./types"
import { StateAbbreviations } from "./types"

// Components
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"
import DeleteBtn from "../../../buttons/forms/DeleteBtn/DeleteBtn"

export const HeaderLink = ({ index }: { index: number }) => { // Respondent header link
  const { methods } = useUpdateRespondentFormContext()

  const hasResponded = methods.getValues(`respondents.${ index }.hasResponded`)
  const response = methods.getValues(`respondents.${ index }.response`) ? <span className="text-success">Responded In Favor</span> : <span className="text-warning">Responded Against</span>
  const shortId = methods.getValues(`respondents.${ index }.shortId`)

  return (
    <div className={`flex gap-4 justify-between pb-1 xl:ml-auto xl:justify-normal ${ hasResponded ? styles.hasResponded : styles.awaitingResponse}`}>
      <Link to={`/respondent?shortId=${ shortId }`} className={`text-secondary text-center hover:text-warning ${ hasResponded ? 'hidden' : null }`}>Respondent ID: {shortId}</Link>
      <span className="text-center">{hasResponded ? response : 'Awaiting Response'}</span>
    </div>
  )
}

export const NameInput = ({ index }: { index: number }) => { // Name input
  const { methods } = useUpdateRespondentFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Name:'}
          name={`respondents.${ index }.name`} />
        <input 
          type="text"
          className={styles.input}
          { ...methods.register(`respondents.${ index }.name`, {
            maxLength: {
              value: 255,
              message: 'Name must be 255 characters or less'
            },
            onChange: () => methods.trigger(`respondents.${ index }.name`)
          }) } />
      </div>
      <FormError field={`respondents.${ index }.name`} />
    </div>
  )
}

export const AddressInput = ({ index }: { index: number }) => { // Address input
  const { methods } = useUpdateRespondentFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Address:'}
          name={`respondents.${ index }.address`}
          required={true} />
        <input 
          type="text"
          className={styles.input}
          { ...methods.register(`respondents.${ index }.address`, {
            required: 'Address is required',
            maxLength: {
              value: 255,
              message: 'Address must be 255 characters or less'
            },
            onBlur: () => methods.trigger(`respondents.${ index }.address`),
            onChange: () => methods.trigger(`respondents.${ index }.address`)
          }) } />
      </div>
      <FormError field={`respondents.${ index }.address`} />
    </div>
  )
}

export const OwnerInfoInputs = ({ index }: { index: number }) => { // Owner info inputs
  
  return (
    <div className="flex gap-3 flex-wrap">
      <OwnerAddressInput index={index} />
      <OwnerCityInput index={index} />
      <OwnerStateInput index={index} />
      <OwnerZIPInput index={index} />
    </div>
  )
}

export const DeleteRespondentBtn = ({ index }: { index: number }) => { // Delete respondent button
  const [state, setState] = useState<UpdateRespondentFormState>({ deleteBtnActive: false })
  
  const { methods } = useUpdateRespondentFormContext()

  const queryClient = useQueryClient()

  const hasResponded = methods.getValues(`respondents.${ index }.hasResponded`)
  const uuid = methods.getValues(`respondents.${ index }.uuid`)
  const parentId = methods.getValues('uuid')

  return (
    <div className="mx-auto pt-10">
      <DeleteBtn { ...setDeleteBtnProps(state.deleteBtnActive, hasResponded, uuid, { setState, invalidateQuery: () => queryClient.invalidateQueries(['getPetition', parentId]) }) } />
    </div>
  )
}

const OwnerAddressInput = ({ index }: { index: number }) => { // Owner address input
  const { methods } = useUpdateRespondentFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Owner Address:'}
          name={`respondents.${ index }.ownerAddress`} />
        <input 
          type="text"
          className={styles.input}
          { ...methods.register(`respondents.${ index }.ownerAddress`, {
            maxLength: {
              value: 255,
              message: 'Owner address must be 255 characters or less'
            },
            onChange: () => methods.trigger(`respondents.${ index }.ownerAddress`)
          }) } />
      </div>
      <FormError field={`respondents.${ index }.ownerAddress`} />
    </div>
  )
}

const OwnerCityInput = ({ index }: { index: number }) => { // Owner city input
  const { methods } = useUpdateRespondentFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Owner City:'}
          name={`respondents.${ index }.ownerCity`} />
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
  )
}

const OwnerStateInput = ({ index }: { index: number }) => { // Owner state input
  const { methods } = useUpdateRespondentFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Owner State:'}
          name={`respondents.${ index }.ownerState`} />
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
  )
}

const OwnerZIPInput = ({ index }: { index: number }) => { // Owner ZIP input
  const { methods } = useUpdateRespondentFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Owner ZIP:'}
          name={`respondents.${ index }.ownerZIP`} />
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
            },
            onChange: () => methods.trigger(`respondents.${ index }.ownerZIP`)
          }) } />
      </div>
      <FormError field={`respondents.${ index }.ownerZIP`} />
    </div>
  )
}