import { SetupPluginContext } from '../../../contexts/SetupPlugin.context'
import OutlinedCard from '../../molecules/OutlinedCard'
import ApiCredentialForm from './credentials/ApiCredential.form'
import AwsCredentialForm from './credentials/AwsCredential.form'
import GithubCredentialForm from './credentials/GithubCredential.form'
import SqlCredential from './credentials/SqlCredential.form'
import styled from '@emotion/styled'
import { Autocomplete, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'

const ProviderFormStep2 = () => {
  const { selectedProvider, selectedMetric, setSelectedMetric } = useContext(SetupPluginContext)
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const credentialType = selectedProvider?.credential?.type || ''

  return (
    <Step2Container>
      <OutlinedCard title="Instructions">
        {selectedProvider?.instruction && (
          <ReactMarkdown>{selectedProvider.instruction}</ReactMarkdown>
        )}
      </OutlinedCard>
      <OutlinedCard title="Credentials">
        {credentialType && (
          <>
            {credentialType === 'github' && <GithubCredentialForm />}
            {credentialType === 'aws' && <AwsCredentialForm />}
            {credentialType === 'apiEndpoint' && <ApiCredentialForm />}
            {credentialType === 'dbConnection' && <SqlCredential />}
          </>
        )}
      </OutlinedCard>
      <OutlinedCard title="Metrics">
        <TextField
          id="name"
          label="Nom"
          type="text"
          variant="outlined"
          size="small"
          {...register('name', {
            required: 'This field is required.'
          })}
        />
        <Autocomplete
          id="metrics"
          size="small"
          options={selectedProvider?.metrics || []}
          value={selectedMetric}
          getOptionLabel={(option) => option.name}
          onChange={(event, value) => value && setSelectedMetric(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Metrics"
              error={Boolean(errors.metric)}
              helperText={errors.metric?.message as string}
              placeholder="Select a metric"
              {...register('metric', {
                required: 'test'
              })}
              sx={{ minWidth: '250px' }}
            />
          )}
        />
        <TextField label="Resource ID" variant="outlined" size="small" />
      </OutlinedCard>
    </Step2Container>
  )
}

const Step2Container = styled.div`
  margin-top: 1rem;
`

export default ProviderFormStep2
