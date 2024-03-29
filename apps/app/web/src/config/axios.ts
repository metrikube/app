import {
  AlertAdapterImpl,
  DashboardMetricsImpl,
  PluginAdapterImpl
} from '@metrikube/infrastructure'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `http://${window.location.hostname}:${import.meta.env.VITE_API_PORT}/api/v1`,
  timeout: 10000
})

export const useAdapter = () => {
  const pluginAdapter = new PluginAdapterImpl(axiosInstance)
  const alertAdapter = new AlertAdapterImpl(axiosInstance)
  const dashboardMetricsAdapter = new DashboardMetricsImpl(axiosInstance)
  return {
    pluginAdapter,
    alertAdapter,
    dashboardMetricsAdapter
  }
}
