import { MetricModel, PluginModel } from '@metrikube/core'
import React, { Dispatch, SetStateAction, createContext, useState } from 'react'

interface SetupPluginContextType {
  selectedProvider: PluginModel | null
  selectedMetric: MetricModel | null
  pluginToMetricId: string
  setSelectedProvider: Dispatch<SetStateAction<PluginModel | null>>
  setSelectedMetric: Dispatch<SetStateAction<MetricModel | null>>
  setPluginToMetricId: Dispatch<SetStateAction<string>>
}

export const SetupPluginContext = createContext<SetupPluginContextType>({
  selectedProvider: null,
  selectedMetric: null,
  pluginToMetricId: '',
  setSelectedProvider: () => ({}),
  setSelectedMetric: () => ({}),
  setPluginToMetricId: () => ({})
})

export const SetupPluginProvider = ({ children }: { children: JSX.Element }) => {
  const [selectedProvider, setSelectedProvider] = useState<PluginModel | null>(null)
  const [selectedMetric, setSelectedMetric] = useState<MetricModel | null>(null)
  const [pluginToMetricId, setPluginToMetricId] = useState('')

  return (
    <SetupPluginContext.Provider
      value={{
        selectedProvider,
        selectedMetric,
        pluginToMetricId,
        setSelectedProvider,
        setSelectedMetric,
        setPluginToMetricId
      }}>
      {children}
    </SetupPluginContext.Provider>
  )
}
