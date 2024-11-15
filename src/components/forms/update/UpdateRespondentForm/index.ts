import { deleteRespondent } from "../../../../context/App/AppActions"
import { savedPopup, errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { UpdateRespondentFormUseForm } from "./types"
import { DeleteBtnProps } from "../../../buttons/forms/DeleteBtn/types"
import { SetDeleteBtnProps, FilterRespondentsProps } from "./types"

export const setDeleteBtnProps = (deleteBtnActive: SetDeleteBtnProps['deleteBtnActive'], hasResponded: SetDeleteBtnProps['hasResponded'], uuid: SetDeleteBtnProps['uuid'], options: SetDeleteBtnProps['options']): DeleteBtnProps => { // Delete respondent button props
  const { setState, invalidateQuery } = options

  const props: DeleteBtnProps = {
    label: '',
    handleClick: () => setState(prevState => ({ ...prevState, deleteBtnActive: !prevState.deleteBtnActive })),
    disabled: hasResponded
  }

  if(!deleteBtnActive) {
    props.label = 'Delete Petition Respondent'
  } else {
    props.label = 'Confirm Delete Respondent'
    props.handleClick = async () => {
      const result = await deleteRespondent(uuid)

      if(result.success) {
        savedPopup(result.msg)
        invalidateQuery()
      } else errorPopup(result.msg || 'Something Went Wrong')
    }
  }

  return props
}

export const filterRespondents = (respondents: FilterRespondentsProps['respondents'], uuid: FilterRespondentsProps['uuid']): UpdateRespondentFormUseForm[] => { // Filter respondents to remove deleted respondent
  const filtered = respondents.filter(respondent => respondent.uuid !== uuid)

  return filtered.map(respondent => {
    const obj = {
      name: respondent.name,
      address: respondent.address,
      ownerAddress: respondent.ownerAddress,
      ownerCity: respondent.ownerCity,
      ownerState: respondent.ownerState,
      ownerZIP: respondent.ownerZIP,
      hasResponded: respondent.hasResponded
    } as UpdateRespondentFormUseForm

    return obj
  })
}