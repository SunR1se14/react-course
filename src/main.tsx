import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import { Provider } from 'react-redux'
import { store } from './store/store'
import ThemeContextProvider from './context/ThemeContextProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ThemeContextProvider>
    </Provider>
  </React.StrictMode>,
)
