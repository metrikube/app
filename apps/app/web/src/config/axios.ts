import env from '../../public/config.json'
import {
  AlertAdapterImpl,
  DashboardMetricsImpl,
  PluginAdapterImpl
} from '@metrikube/infrastructure'
import axios from 'axios'

export const baseURL = `http://localhost:${env.API_PORT}/api/v1`

const axiosInstance = axios.create({ baseURL, timeout: 10000 })

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
