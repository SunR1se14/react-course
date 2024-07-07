import { Component, ReactNode } from 'react'
import styles from './ErrorBoundary.module.scss'

interface State {
  hasError: boolean
}

interface Props {
  children: ReactNode
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    console.error('ErrorBoundary caught an error:', error)
    return { hasError: true }
  }

  reloadPage = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles['error-wrapper']}>
          <h2 className={styles['error-title']}>Something went wrong.</h2>
          <p className={styles['error-desc']}>Please try again later.</p>
          <button className={styles['error-button']} onClick={this.reloadPage}>
            Return
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
