import { DashboardProvider } from './contexts/Dashboard.context'
import Dashboard from './pages/Dashboard'
import React from 'react'

export function App() {
  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  )
}

export default App
