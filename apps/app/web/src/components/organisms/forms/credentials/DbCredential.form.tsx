import styled from '@emotion/styled'
import { DbConnectionCredentialType } from '@metrikube/common'
import { TextField } from '@mui/material'
import { SetupPluginContext } from 'apps/app/web/src/contexts/SetupPlugin.context'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'

const DbCredentialForm = () => {
  const { setDbCredential } = useContext(SetupPluginContext)
  const {
    register,
    getValues,
    formState: { errors }
  } = useForm<DbConnectionCredentialType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      dbHost: '',
      dbName: '',
      dbPort: 0,
      dbUsername: '',
      dbPassword: ''
    }
  })
  return <StyledForm>
    <TextField
      label="Host"
      variant="outlined"
      size="small"
      {...register('dbHost', {
        required: 'This field is required.',
        onChange: () => {
          setDbCredential((prevState) => ({
            ...prevState,
            dbHost: getValues().dbHost
          }))
        }
      })} />
    <TextField
      label="Database name"
      variant="outlined"
      size="small"
      {...register('dbName', {
        required: 'This field is required.',
        onChange: () => {
          setDbCredential((prevState) => ({
            ...prevState,
            dbName: getValues().dbName
          }))
        }
      })} />
    <TextField
      label="Access key id"
      variant="outlined"
      size="small"
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      {...register('dbPort', {
        required: 'This field is required.',
        onChange: () => {
          setDbCredential((prevState) => ({
            ...prevState,
            dbPort: getValues().dbPort
          }))
        }
      })} />
    <TextField
      label="Access key id"
      variant="outlined"
      size="small"
      {...register('dbUsername', {
        required: 'This field is required.',
        onChange: () => {
          setDbCredential((prevState) => ({
            ...prevState,
            dbUsername: getValues().dbUsername
          }))
        }
      })} />
    <TextField
      label="Access key id"
      variant="outlined"
      size="small"
      {...register('dbPassword', {
        required: 'This field is required.',
        onChange: () => {
          setDbCredential((prevState) => ({
            ...prevState,
            dbPassword: getValues().dbPassword
          }))
        }
      })} />
  </StyledForm>
}

const StyledForm = styled.form``

export default DbCredentialForm
