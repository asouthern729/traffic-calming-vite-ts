import { useNavigate } from 'react-router-dom'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

// Types
import { ErrorBoundaryProps } from './types'

function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const ErrorFallback = () => {
    const navigate = useNavigate()

    setTimeout(() => {
      const href = '/login'

      navigate(href)
    }, (50))

    return null
  }

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset any state or perform any action on reset
      }}
    >
      {children}
    </ReactErrorBoundary>
  )
}

export default ErrorBoundary