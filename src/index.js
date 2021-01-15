import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import App from './App'
import './index.css'

import { PublicClientApplication } from '@azure/msal-browser'
import AuthContextProvider from './contexts/AuthContext'
import { msalConfig } from './config/msal-config'

import { ThemeProvider } from '@material-ui/core/styles'
import { MsalProvider } from '@azure/msal-react'

import { theme } from './styles/theme.js'

const msalInstance = new PublicClientApplication(msalConfig)

const AppProvider = () => (
  <Router>
    <ThemeProvider theme={theme}>
      <MsalProvider instance={msalInstance} >
        <AuthContextProvider>
          <React.StrictMode>
            <App/>
          </React.StrictMode>
        </AuthContextProvider>
      </MsalProvider>
    </ThemeProvider>
  </Router>
)

ReactDOM.render(
  <AppProvider />,
  document.getElementById('root')
)
