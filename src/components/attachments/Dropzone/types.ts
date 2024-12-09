// Types
import { FileRejection, DropEvent } from 'react-dropzone'

export interface DropzoneProps { // Dropzone props
  onDrop: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void
  label: string
}