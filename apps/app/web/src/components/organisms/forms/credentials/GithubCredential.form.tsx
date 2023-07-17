import styled from '@emotion/styled'
import { GithubCredentialType } from '@metrikube/common'
import { TextField } from '@mui/material'
import { PluginContext } from 'apps/app/web/src/contexts/plugin.context'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'

const GithubCredentialForm = () => {
  const { setGithubCredential } = useContext(PluginContext)
  const {
    register,
    getValues,
    formState: { errors }
  } = useForm<GithubCredentialType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      accessToken: '',
      owner: '',
      repo: ''
    }
  })
  return (
    <StyledForm>
      <TextField
        multiline
        label="Accès Token"
        variant="outlined"
        size="small"
        {...register('accessToken', {
          required: 'This field is required.',
          onChange: () => {
            setGithubCredential((prevState) => ({
              ...prevState,
              accessToken: getValues().accessToken
            }))
          }
        })}
      />
      <TextField
        label="Propriétaire"
        variant="outlined"
        size="small"
        {...register('accessToken', {
          required: 'This field is required.',
          onChange: () => {
            setGithubCredential((prevState) => ({
              ...prevState,
              owner: getValues().owner
            }))
          }
        })}
      />
      <TextField
        label="Repository"
        variant="outlined"
        size="small"
        {...register('accessToken', {
          required: 'This field is required.',
          onChange: () => {
            setGithubCredential((prevState) => ({
              ...prevState,
              repo: getValues().repo
            }))
          }
        })}
      />
    </StyledForm>
  )
}

const StyledForm = styled.form``

export default GithubCredentialForm
