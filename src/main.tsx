import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
)
