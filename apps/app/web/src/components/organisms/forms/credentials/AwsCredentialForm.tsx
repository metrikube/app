import styled from '@emotion/styled'
import { TextField } from '@mui/material'
import { PluginContext } from 'apps/app/web/src/contexts/plugin.context'
import React, { useContext } from 'react'

const AwsCredentialForm = () => {
  const { setAwsCredential } = useContext(PluginContext)

  return (
    <StyledForm>
      <TextField onChange={(e) =>
        setAwsCredential((prevState) => ({
          ...prevState,
          accessKeyId: e.target.value
        }))
      } required label="Access key id" variant="outlined" size="small" />
      <TextField onChange={(e) =>
        setAwsCredential((prevState) => ({
          ...prevState,
          secretAccessKey: e.target.value
        }))
      } required label="API Key" variant="outlined" size="small" />
      <TextField onChange={(e) =>
        setAwsCredential((prevState) => ({
          ...prevState,
          region: e.target.value
        }))
      } required label="Region" variant="outlined" size="small" />
    </StyledForm>
  )
}

const StyledForm = styled.form``

export default AwsCredentialForm
