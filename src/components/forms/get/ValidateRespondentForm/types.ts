export interface ValidateRespondentFormUseForm { // ValidateRespondentForm useForm
  shortId: string
}

export interface HandleValidateRespondentFormSubmitProps { // handleValidateRespondentFormSubmit fn props
  formData: ValidateRespondentFormUseForm
  options : {
    navigate: () => void
  }
}