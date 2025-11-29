import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'
import './i18n/i18n'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary'
import OfflineIndicator from './components/OfflineIndicator'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <HashRouter>
          <OfflineIndicator />
          <App />
        </HashRouter>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)

