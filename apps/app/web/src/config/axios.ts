import { PluginAdapterImpl, AlertAdapterImpl } from '@metrikube/infrastructure'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_API_PORT}/api/v1`,
  timeout: 10000
})

export { axiosInstance }

export const useAdapter = () => {
  const pluginAdapter = new PluginAdapterImpl(axiosInstance)
  const alertAdapter = new AlertAdapterImpl(axiosInstance)
  return {
    pluginAdapter,
    alertAdapter
  }
}
