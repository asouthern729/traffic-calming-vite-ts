export interface FormLabelProps {
  label: string
  name: string
  required?: boolean
}

export interface SetFormLabelProps { // setFormLabelProps fn props
  props: FormLabelProps
}