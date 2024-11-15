// Types
import { HandleRemoveNewRespondentProps } from "./types"

export const handleRemoveNewRespondent = (methods: HandleRemoveNewRespondentProps['methods'], index: HandleRemoveNewRespondentProps['index']): void => { // Remove newRespondent from form state
  const newRespondents = methods.getValues('newRespondents')
  const updated = newRespondents.filter((_, i) => i !== index)

  methods.setValue('newRespondents', updated, { shouldValidate: true })
}