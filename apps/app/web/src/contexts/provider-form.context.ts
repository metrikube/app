import { MetricModel } from 'apps/app/core/src/lib/domain/models/Metric.model'
import { PluginModel } from 'apps/app/core/src/lib/domain/models/Plugin.model'
import { createContext } from 'react'

interface ProviderFormContextType {
  selectedProvider: PluginModel | null
  selectedMetric: MetricModel | null
}

export const ProviderFormContext = createContext<ProviderFormContextType>({
  selectedProvider: null,
  selectedMetric: null
})
