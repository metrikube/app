import { PluginContext } from '../../../contexts/plugin.context'
import OutlinedCard from '../../molecules/OutlinedCard'
import AwsCredentialForm from './credentials/AwsCredentialForm'
import GithubCredentialForm from './credentials/GithubCredentialForm'
import styled from '@emotion/styled'
import { Autocomplete, TextField } from '@mui/material'
import React, { useContext } from 'react'
import ReactMarkdown from 'react-markdown'

const ProviderFormStep2 = () => {
  const { selectedProvider, selectedMetric, setSelectedMetric } = useContext(PluginContext)
  const credentialType = selectedProvider?.credential?.type || ''

  return (
    <Step2Container>
      <OutlinedCard title="Instructions">
        <h3>Instructions</h3>
        {selectedProvider?.instruction && (
          <ReactMarkdown>{selectedProvider.instruction}</ReactMarkdown>
        )}
      </OutlinedCard>
      <OutlinedCard title="Credential">
        {credentialType && (
          <>
            {credentialType === 'github' && <GithubCredentialForm />}
            {credentialType === 'aws' && <AwsCredentialForm />}
          </>
        )}
      </OutlinedCard>
      <OutlinedCard title="Metrics">
        <Autocomplete
          id="tags-standard"
          options={selectedProvider?.metrics || []}
          value={selectedMetric}
          getOptionLabel={(option) => option.name}
          onChange={(event, value) => value && setSelectedMetric(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Multiple values"
              placeholder="Favorites"
            />
          )}
        />
      </OutlinedCard>
    </Step2Container>
  )
}

const Step2Container = styled.div`
  margin-top: 1rem;
`

export default ProviderFormStep2
