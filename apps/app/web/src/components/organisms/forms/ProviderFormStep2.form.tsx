import { SetupPluginContext } from '../../../contexts/SetupPlugin.context'
import OutlinedCard from '../../molecules/OutlinedCard'
import ApiCredentialForm from './credentials/ApiCredential.form'
import AwsCredentialForm from './credentials/AwsCredential.form'
import GithubCredentialForm from './credentials/GithubCredential.form'
import SqlCredential from './credentials/SqlCredential.form'
import styled from '@emotion/styled'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Autocomplete, TextField } from '@mui/material'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import React, { useContext } from 'react'
import { useFormContext } from 'react-hook-form'

const ProviderFormStep2 = () => {
  const { selectedProvider, selectedMetric, setSelectedMetric } = useContext(SetupPluginContext)
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const {
    register,
    formState: { errors }
  } = useFormContext()

  const credentialType = selectedProvider?.credential?.type || ''

  return (
    <Step2Container>
      {selectedProvider?.instruction && (
        <StyledAccordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header">
            <Typography
              sx={{ width: '33%', flexShrink: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
              Instructions
            </Typography>
            {!expanded && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ color: 'text.secondary' }}>Voir le guide</Typography>
                <VisibilityIcon sx={{ ml: 1, color: 'text.secondary' }} />
              </Box>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <InstructionWrapper
              dangerouslySetInnerHTML={{ __html: selectedProvider.instruction }}
            />
          </AccordionDetails>
        </StyledAccordion>
      )}

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
      </OutlinedCard>
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

const StyledAccordion = styled(Accordion)`
  margin-bottom: 1rem;
  box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
`

export default ProviderFormStep2
