import { useDropzone } from "react-dropzone"
import icon from '../../../assets/icons/upload/upload.svg'
import styles from './Dropzone.module.css'

// Types
import { FileRejection, DropEvent } from 'react-dropzone'

type DropzoneProps = { onDrop: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void }

function Dropzone(props: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: props.onDrop,
    multiple: false,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
      'application/pdf': ['.pdf']
    }
  })

  return (
    <div className="flex flex-col p-3 m-auto w-3/4" { ...getRootProps() }>
      <input { ...getInputProps() } />
      <div className="flex flex-col gap-2 items-center py-6 bg-neutral">
        <img src={icon} alt="upload icon" className="w-14" />
        <p className={styles.label}>{!isDragActive ? 'Click to select, or drag and drop attachment..' : 'Drop file..'}</p>
      </div>
    </div>
  )
}

export default Dropzone