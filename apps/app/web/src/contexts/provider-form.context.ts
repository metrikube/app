import { createContext } from 'react'

interface ProviderFormContextType {
  selectedProvider: any | null
  selectedMetric: unknown | null
}

export const ProviderFormContext = createContext<ProviderFormContextType>({
  selectedProvider: null,
  selectedMetric: null
})
