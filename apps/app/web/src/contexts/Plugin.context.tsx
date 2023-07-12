import { AwsCredentialType, GithubCredentialType } from '@metrikube/common'
import { MetricModel, PluginModel } from '@metrikube/core'
import React, { Dispatch, SetStateAction, createContext, useState } from 'react'

interface PluginContextType {
  selectedProvider: PluginModel | null
  selectedMetric: MetricModel | null
  githubCredential: GithubCredentialType
  awsCredential: AwsCredentialType
  setSelectedProvider: Dispatch<SetStateAction<PluginModel | null>>
  setSelectedMetric: Dispatch<SetStateAction<MetricModel | null>>
  setGithubCredential: Dispatch<SetStateAction<GithubCredentialType>>
  setAwsCredential: Dispatch<SetStateAction<AwsCredentialType>>
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
    region: ''
  },
  setSelectedProvider: () => ({}),
  setSelectedMetric: () => ({}),
  setGithubCredential: () => ({}),
  setAwsCredential: () => ({})
})

export const PluginProvider = ({ children }: { children: JSX.Element }) => {
  const [selectedProvider, setSelectedProvider] = useState<PluginModel | null>(null)
  const [selectedMetric, setSelectedMetric] = useState<MetricModel | null>(null)
  const [githubCredential, setGithubCredential] = useState<GithubCredentialType>({
    accessToken: '',
    repo: '',
    owner: ''
  })
  const [awsCredential, setAwsCredential] = useState<AwsCredentialType>({
    accessKeyId: '',
    secretAccessKey: '',
    region: ''
  })

  return (
    <PluginContext.Provider
      value={{
        selectedProvider,
        selectedMetric,
        githubCredential,
        awsCredential,
        setSelectedProvider,
        setSelectedMetric,
        setGithubCredential,
        setAwsCredential
      }}>
      {children}
    </PluginContext.Provider>
  )
}