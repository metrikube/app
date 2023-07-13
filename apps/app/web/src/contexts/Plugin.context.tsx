import {
  ApiEndpointCredentialType,
  AwsCredentialType,
  DbConnectionCredentialType,
  GithubCredentialType
} from '@metrikube/common'
import { MetricModel, PluginModel } from '@metrikube/core'
import React, { Dispatch, SetStateAction, createContext, useState } from 'react'

interface PluginContextType {
  selectedProvider: PluginModel | null
  selectedMetric: MetricModel | null
  githubCredential: GithubCredentialType
  dbCredential: DbConnectionCredentialType
  awsCredential: AwsCredentialType & { ressourceId?: string }
  apiHealthCheckCredential: ApiEndpointCredentialType
  setSelectedProvider: Dispatch<SetStateAction<PluginModel | null>>
  setSelectedMetric: Dispatch<SetStateAction<MetricModel | null>>
  setGithubCredential: Dispatch<SetStateAction<GithubCredentialType>>
  setAwsCredential: Dispatch<SetStateAction<AwsCredentialType & { ressourceId?: string }>>
  setApiHealthCheckCredential: Dispatch<SetStateAction<ApiEndpointCredentialType>>
  setDbCredential: Dispatch<SetStateAction<DbConnectionCredentialType>>
}

export const PluginContext = createContext<PluginContextType>({
  selectedProvider: null,
  selectedMetric: null,
  githubCredential: {
    accessToken: '',
    repo: '',
    owner: ''
  },
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
  setDbCredential: () => ({})
})

export const PluginProvider = ({ children }: { children: JSX.Element }) => {
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
  const [apiHealthCheckCredential, setApiHealthCheckCredential] = useState<ApiEndpointCredentialType>({
    apiEndpoint: ''
  })
  const [dbCredential, setDbCredential] = useState({
    dbHost: '',
    dbName: '',
    dbPort: 0,
    dbUsername: '',
    dbPassword: ''
  })

  return (
    <PluginContext.Provider
      value={{
        selectedProvider,
        selectedMetric,
        githubCredential,
        awsCredential,
        apiHealthCheckCredential,
        dbCredential,
        setSelectedProvider,
        setSelectedMetric,
        setGithubCredential,
        setAwsCredential,
        setApiHealthCheckCredential,
        setDbCredential
      }}>
      {children}
    </PluginContext.Provider>
  )
}
