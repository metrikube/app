import App from './app'
import './assets/styles/index.css'
import { theme } from './config/MUI'
import { axiosInstance } from './config/axios'
import { GetPluginsUsecase } from '@metrikube/core'
import { PluginAdapterImpl } from '@metrikube/infrastructure'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { StrictMode } from 'react'
import React from 'react'
import * as ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const queryClient = new QueryClient()

const pluginAdapter = new PluginAdapterImpl(axiosInstance)
const getPluginsUsecase = new GetPluginsUsecase(pluginAdapter)

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
