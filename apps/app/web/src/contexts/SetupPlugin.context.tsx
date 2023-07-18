import {
  ApiEndpointCredentialType,
  AwsCredentialType,
  DbConnectionCredentialType,
  GithubCredentialType,
  MetricType,
  PluginResult
} from '@metrikube/common'
import { AlertRequest, MetricModel, PluginModel } from '@metrikube/core'
import React, { Dispatch, SetStateAction, createContext, useState } from 'react'

interface SetupPluginContextType {
  selectedProvider: PluginModel | null
  selectedMetric: MetricModel | null
  githubCredential: GithubCredentialType
  dbCredential: DbConnectionCredentialType
  awsCredential: AwsCredentialType & { ressourceId?: string }
  apiHealthCheckCredential: ApiEndpointCredentialType
  metricFields: PluginResult<MetricType> | null
  pluginToMetricId: string
  metricAlerts: AlertRequest[]
  setSelectedProvider: Dispatch<SetStateAction<PluginModel | null>>
  setSelectedMetric: Dispatch<SetStateAction<MetricModel | null>>
  setGithubCredential: Dispatch<SetStateAction<GithubCredentialType>>
  setAwsCredential: Dispatch<SetStateAction<AwsCredentialType & { ressourceId?: string }>>
  setApiHealthCheckCredential: Dispatch<SetStateAction<ApiEndpointCredentialType>>
  setDbCredential: Dispatch<SetStateAction<DbConnectionCredentialType>>
  setMetricFields: Dispatch<SetStateAction<PluginResult<MetricType> | null>>
  setPluginToMetricId: Dispatch<SetStateAction<string>>
  setMetricAlerts: Dispatch<SetStateAction<AlertRequest[]>>
}

export const SetupPluginContext = createContext<SetupPluginContextType>({
  selectedProvider: null,
  selectedMetric: null,
  githubCredential: {
    accessToken: '',
    repo: '',
    owner: ''
  },
  metricFields: null,
  metricAlerts: [],
  pluginToMetricId: '',
  awsCredential: {
    accessKeyId: '',
    secretAccessKey: '',
    region: '',
    ressourceId: ''
  },
  apiHealthCheckCredential: {
    apiEndpoint: ''
  },
  dbCredential: {
    dbHost: '',
    dbName: '',
    dbPort: 0,
    dbUsername: '',
    dbPassword: ''
  },
  setSelectedProvider: () => ({}),
  setSelectedMetric: () => ({}),
  setGithubCredential: () => ({}),
  setAwsCredential: () => ({}),
  setApiHealthCheckCredential: () => ({}),
  setDbCredential: () => ({}),
  setMetricFields: () => ({}),
  setPluginToMetricId: () => ({}),
  setMetricAlerts: () => ({})
})

export const SetupPluginProvider = ({ children }: { children: JSX.Element }) => {
  const [selectedProvider, setSelectedProvider] = useState<PluginModel | null>(null)
  const [selectedMetric, setSelectedMetric] = useState<MetricModel | null>(null)
  const [githubCredential, setGithubCredential] = useState<GithubCredentialType>({
    accessToken: '',
    repo: '',
    owner: ''
  })
  const [awsCredential, setAwsCredential] = useState<AwsCredentialType & { ressourceId?: string }>({
    accessKeyId: '',
    secretAccessKey: '',
    region: '',
    ressourceId: ''
  })
  const [apiHealthCheckCredential, setApiHealthCheckCredential] =
    useState<ApiEndpointCredentialType>({
      apiEndpoint: ''
    })
  const [dbCredential, setDbCredential] = useState({
    dbHost: '',
    dbName: '',
    dbPort: 0,
    dbUsername: '',
    dbPassword: ''
  })

  const [metricFields, setMetricFields] = useState<PluginResult<MetricType> | null>(null)
  const [pluginToMetricId, setPluginToMetricId] = useState('')
  const [metricAlerts, setMetricAlerts] = useState<AlertRequest[]>([])
  return (
    <SetupPluginContext.Provider
      value={{
        selectedProvider,
        selectedMetric,
        githubCredential,
        awsCredential,
        apiHealthCheckCredential,
        dbCredential,
        metricFields,
        pluginToMetricId,
        metricAlerts,
        setMetricFields,
        setSelectedProvider,
        setSelectedMetric,
        setGithubCredential,
        setAwsCredential,
        setApiHealthCheckCredential,
        setDbCredential,
        setPluginToMetricId,
        setMetricAlerts
      }}>
      {children}
    </SetupPluginContext.Provider>
  )
}
