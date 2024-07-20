import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import { Provider } from 'react-redux'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
)
