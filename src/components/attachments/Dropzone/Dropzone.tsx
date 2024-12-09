import { useDropzone } from "react-dropzone"
import icon from '../../../assets/icons/upload/upload.svg'
import styles from './Dropzone.module.css'

// Types
import { DropzoneProps } from "./types"

function Dropzone({ onDrop, label }: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
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
        <p className={styles.label}>{!isDragActive ? label : 'Drop file..'}</p>
      </div>
    </div>
  )
}

export default Dropzone