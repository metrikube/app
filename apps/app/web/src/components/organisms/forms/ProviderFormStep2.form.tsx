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

const ProviderFormStep2 = () => {
  const { selectedProvider, selectedMetric, setSelectedMetric } = useContext(SetupPluginContext)
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const credentialType = selectedProvider?.credential?.type || ''

  return (
    <Step2Container>
      {selectedProvider?.instruction && (
        <OutlinedCard title="Instructions">
          <InstructionWrapper dangerouslySetInnerHTML={{ __html: selectedProvider.instruction }} />
        </OutlinedCard>
      )}
      <OutlinedCard title="Identifiants">
        {credentialType && (
          <>
            {credentialType === 'github' && <GithubCredentialForm />}
            {credentialType === 'aws' && <AwsCredentialForm />}
            {credentialType === 'apiEndpoint' && <ApiCredentialForm />}
            {credentialType === 'dbConnection' && <SqlCredential />}
          </>
        )}
      </OutlinedCard>
      <OutlinedCard title="Widget">
        <TextField
          id="name"
          label="Nom"
          type="text"
          variant="outlined"
          size="small"
          error={Boolean(errors.name)}
          helperText={errors.name?.message as string}
          {...register('name', {
            required: 'Ce champs est obligatoire'
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
              label="Metriques"
              error={Boolean(errors.metric)}
              helperText={errors.metric?.message as string}
              placeholder="Sélectionner une métrique"
              {...register('metric', {
                required: 'Ce champs est obligatoire'
              })}
              sx={{ minWidth: '250px' }}
            />
          )}
        />
        {selectedProvider?.type === 'aws' && (
          <TextField label="Ressource ID" variant="outlined" size="small" />
        )}
      </OutlinedCard>
    </Step2Container>
  )
}

const Step2Container = styled.div`
  margin-top: 1rem;
`

const InstructionWrapper = styled.div`
  overflow-x: auto;
  padding: 0.5rem;
  ul {
    padding-left: 16px;
  }
  pre {
    background-color: #f3f3f3;
  }
`

export default ProviderFormStep2
