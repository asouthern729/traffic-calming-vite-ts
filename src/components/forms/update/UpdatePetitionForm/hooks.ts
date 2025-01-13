import { useEffect } from "react"
import { useFieldArray, useForm, useFormContext } from "react-hook-form"

// Types
import { UseFormReturn } from "react-hook-form"
import { Respondent } from "../../../../context/App/types"
import { UpdateRespondentFormUseForm } from "../UpdateRespondentForm/types"
import { UpdatePetitionFormUseForm, UseUpdatePetitionFormUseFormProps, UseUpdatePetitionFormReturn } from "./types"

export const useUpdatePetitionForm = (petition: UseUpdatePetitionFormUseFormProps['petition']): UseUpdatePetitionFormReturn => { // UpdatePetitionForm useForm

  const methods = useForm<UpdatePetitionFormUseForm>({
    defaultValues: {
      description: petition.description,
      startDate: petition.startDate,
      endDate: petition.endDate,
      respondents: setRespondents(petition.Respondents),
      newRespondents: [],
      attachment: petition.PetitionAttachment,
      uuid: petition.uuid
    }
  })

  const { fields: respondents, remove, append, replace } = useFieldArray({
    control: methods.control,
    name: 'respondents'
  })

  const { fields: newRespondents } = useFieldArray({
    control: methods.control,
    name: 'newRespondents'
  })

  useEffect(() => { // Update respondents in form state on server state change
    replace(setRespondents(petition.Respondents))
  }, [petition.Respondents, replace])

  return {
    methods,
    respondents,
    newRespondents,
    removeRespondent: remove,
    appendRespondent: append
  }
}

export const useUpdatePetitionFormContext = (): { methods: UseFormReturn<UpdatePetitionFormUseForm> } => { // UpdatePetitionForm context
  const methods = useFormContext<UpdatePetitionFormUseForm>()

  return { methods }
}

const setRespondents = (respondents: Respondent[]): UpdateRespondentFormUseForm[] => {
  return respondents.map(respondent => {
    const obj: UpdateRespondentFormUseForm = {
      name: respondent.name,
      address: respondent.address,
      ownerAddress: respondent.ownerAddress,
      ownerCity: respondent.ownerCity,
      ownerState: respondent.ownerState,
      ownerZIP: respondent.ownerZIP,
      shortId: respondent.shortId,
      hasResponded: respondent.Response ? true : false,
      response: respondent.Response?.response || null,
      parentId: respondent.parentId,
      uuid: respondent.uuid
    }

    return obj
  })
}