import { ProviderFormContext } from '../../../contexts/provider-form.context'
import styled from '@emotion/styled'
import { CREDENTIALS, AWSMetricsMock, GithubMetricsMock } from '@metrikube/core'
import LoadingButton from '@mui/lab/LoadingButton'
import { Autocomplete, TextField } from '@mui/material'
import React, { useContext } from 'react'

interface Props {
  handleMetrics: (metrics: unknown[]) => void
}

const ProviderFormStep2 = ({ handleMetrics }: Props) => {
  const { selectedProvider, selectedMetric } = useContext(ProviderFormContext)

  const credentialType = selectedProvider?.credential.type

  const getMetricsByProvider = (selectedProvider: any): unknown[] => {
    switch (selectedProvider.type) {
      case 'aws':
        return AWSMetricsMock
      case 'github':
        return GithubMetricsMock
      default:
        return []
    }
  }

  return (
    <Step2Container>
      <Credential>
        <h3>Credential</h3>
        {credentialType === CREDENTIALS.USER_PASSWORD.code && (
          <UserPasswordForm>
            <TextField
              required
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              size="small"
            />

            <TextField
              required
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              size="small"
            />

            <LoadingButton size="small" loading={false} variant="outlined">
              Connection test
            </LoadingButton>
          </UserPasswordForm>
        )}
        {credentialType === CREDENTIALS.API_KEY.code && (
          <TextField multiline required label="API Key" variant="outlined" size="small" />
        )}
      </Credential>
      <Metrics>
        <h3>Metrics</h3>
        <Autocomplete
          id="tags-standard"
          options={getMetricsByProvider(selectedProvider)}
          value={selectedMetric}
          getOptionLabel={(option) => option.name}
          onChange={(event, value) => handleMetrics(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Multiple values"
              placeholder="Favorites"
            />
          )}
        />
      </Metrics>
    </Step2Container>
  )
}

const Step2Container = styled.div`
  margin-top: 1rem;
`
const Credential = styled.section``

const Metrics = styled.section``

const UserPasswordForm = styled.form`
  display: flex;
  justify-content: space-evenly;
`

export default ProviderFormStep2