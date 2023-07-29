import { SetupPluginContext } from '../../../contexts/SetupPlugin.context'
import OutlinedCard from '../../molecules/OutlinedCard'
import ApiCredentialForm from './credentials/ApiCredential.form'
import AwsCredentialForm from './credentials/AwsCredential.form'
import DbCredentialForm from './credentials/DbCredential.form'
import GithubCredentialForm from './credentials/GithubCredential.form'
import styled from '@emotion/styled'
import { Autocomplete, TextField } from '@mui/material'
import React, { useContext } from 'react'
import ReactMarkdown from 'react-markdown'

const ProviderFormStep2 = () => {
  const { selectedProvider, selectedMetric, setSelectedMetric, setAwsCredential } = useContext(SetupPluginContext)
  const credentialType = selectedProvider?.credential?.type || ''

  return (
    <Step2Container>
      <OutlinedCard title="Instructions">
        {selectedProvider?.instruction && (
          <ReactMarkdown>{selectedProvider.instruction}</ReactMarkdown>
        )}
      </OutlinedCard>
      <OutlinedCard title="Credential">
        {credentialType && (
          <>
            {credentialType === 'github' && <GithubCredentialForm />}
            {credentialType === 'aws' && <AwsCredentialForm />}
            {credentialType === 'apiEndpoint' && <ApiCredentialForm />}
            {credentialType === 'dbConnection' && <DbCredentialForm />}
          </>
        )}
      </OutlinedCard>
      <OutlinedCard title="Metrics">
        <Autocomplete
          id="metrics"
          options={selectedProvider?.metrics || []}
          value={selectedMetric}
          getOptionLabel={(option) => option.name}
          onChange={(event, value) => value && setSelectedMetric(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Metrics"
              placeholder="Select a metric"
            />
          )}
        />
        <TextField
          onChange={(e) =>
            setAwsCredential((prevState) => ({
              ...prevState,
              secretAccessKey: e.target.value
            }))
          }
          required
          label="Resource ID"
          variant="outlined"
          size="small"
        />
      </OutlinedCard>
    </Step2Container>
  )
}

const Step2Container = styled.div`
  margin-top: 1rem;
`

export default ProviderFormStep2
