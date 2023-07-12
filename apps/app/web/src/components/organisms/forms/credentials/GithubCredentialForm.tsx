import styled from '@emotion/styled'
import { TextField } from '@mui/material'
import { PluginContext } from 'apps/app/web/src/contexts/plugin.context'
import React, { useContext } from 'react'

const GithubCredentialForm = () => {
  const { setGithubCredential } = useContext(PluginContext)
  return (
    <StyledForm>
      <TextField
        onChange={(e) =>
          setGithubCredential((prevState) => ({
            ...prevState,
            accessToken: e.target.value
          }))
        }
        multiline
        required
        label="Accès Token"
        variant="outlined"
        size="small"
      />
      <TextField
        onChange={(e) =>
          setGithubCredential((prevState) => ({
            ...prevState,
            owner: e.target.value
          }))
        }
        required
        label="Propriétaire"
        variant="outlined"
        size="small"
      />
      <TextField
        onChange={(e) =>
          setGithubCredential((prevState) => ({
            ...prevState,
            repo: e.target.value
          }))
        }
        required
        label="Repository"
        variant="outlined"
        size="small"
      />
    </StyledForm>
  )
}

const StyledForm = styled.form``

export default GithubCredentialForm
