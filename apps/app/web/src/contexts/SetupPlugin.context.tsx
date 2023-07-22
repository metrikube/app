import { MetricType, PluginResult } from '@metrikube/common'
import { AlertRequest, MetricModel, PluginModel } from '@metrikube/core'
import React, { Dispatch, SetStateAction, createContext, useState } from 'react'

interface SetupPluginContextType {
  selectedProvider: PluginModel | null
  selectedMetric: MetricModel | null
  metricFields: PluginResult<MetricType> | null
  pluginToMetricId: string
  metricAlerts: AlertRequest[]
  setSelectedProvider: Dispatch<SetStateAction<PluginModel | null>>
  setSelectedMetric: Dispatch<SetStateAction<MetricModel | null>>
  setMetricFields: Dispatch<SetStateAction<PluginResult<MetricType> | null>>
  setPluginToMetricId: Dispatch<SetStateAction<string>>
  setMetricAlerts: Dispatch<SetStateAction<AlertRequest[]>>
}

export const SetupPluginContext = createContext<SetupPluginContextType>({
  selectedProvider: null,
  selectedMetric: null,
  metricFields: null,
  metricAlerts: [],
  pluginToMetricId: '',
  setSelectedProvider: () => ({}),
  setSelectedMetric: () => ({}),
  setMetricFields: () => ({}),
  setPluginToMetricId: () => ({}),
  setMetricAlerts: () => ({})
})

export const SetupPluginProvider = ({ children }: { children: JSX.Element }) => {
  const [selectedProvider, setSelectedProvider] = useState<PluginModel | null>(null)
  const [selectedMetric, setSelectedMetric] = useState<MetricModel | null>(null)
  const [metricFields, setMetricFields] = useState<PluginResult<MetricType> | null>(null)
  const [pluginToMetricId, setPluginToMetricId] = useState('')
  const [metricAlerts, setMetricAlerts] = useState<AlertRequest[]>([])

  return (
    <SetupPluginContext.Provider
      value={{
        selectedProvider,
        selectedMetric,
        pluginToMetricId,
        metricAlerts,
        metricFields,
        setMetricFields,
        setSelectedProvider,
        setSelectedMetric,
        setPluginToMetricId,
        setMetricAlerts
      }}>
      {children}
    </SetupPluginContext.Provider>
  )
}
