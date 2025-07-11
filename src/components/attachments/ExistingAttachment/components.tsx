import { useOnAttachmentBtnClick } from './hooks'

export const ViewAttachmentBtn = () => {
  const onAttachmentBtnClick = useOnAttachmentBtnClick()

  return (
    <button
      type="button"
      onClick={onAttachmentBtnClick}
      className="btn btn-primary font-[play] font-bold uppercase">
        Click To View Attachment
    </button>
  )
}