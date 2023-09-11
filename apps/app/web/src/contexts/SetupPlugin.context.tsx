import { MetricModel, PluginModel } from '@metrikube/core'
import React, { Dispatch, SetStateAction, createContext, useState } from 'react'

interface SetupPluginContextType {
  selectedProvider: PluginModel | null
  selectedMetric: MetricModel | null
  widgetId: string
  setSelectedProvider: Dispatch<SetStateAction<PluginModel | null>>
  setSelectedMetric: Dispatch<SetStateAction<MetricModel | null>>
  setWidgetId: Dispatch<SetStateAction<string>>
}

export const SetupPluginContext = createContext<SetupPluginContextType>({
  selectedProvider: null,
  selectedMetric: null,
  widgetId: '',
  setSelectedProvider: () => ({}),
  setSelectedMetric: () => ({}),
  setWidgetId: () => ({})
})

export const SetupPluginProvider = ({ children }: { children: JSX.Element }) => {
  const [selectedProvider, setSelectedProvider] = useState<PluginModel | null>(null)
  const [selectedMetric, setSelectedMetric] = useState<MetricModel | null>(null)
  const [widgetId, setWidgetId] = useState('')

  return (
    <SetupPluginContext.Provider
      value={{
        selectedProvider,
        selectedMetric,
        widgetId,
        setSelectedProvider,
        setSelectedMetric,
        setWidgetId
      }}>
      {children}
    </SetupPluginContext.Provider>
  )
}
