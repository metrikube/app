import styled from '@emotion/styled'
import { AwsCredentialType } from '@metrikube/common'
import { TextField } from '@mui/material'
import { PluginContext } from 'apps/app/web/src/contexts/plugin.context'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'

const AwsCredentialForm = () => {
  const { setAwsCredential } = useContext(PluginContext)
  const {
    register,
    getValues,
    formState: { errors }
  } = useForm<AwsCredentialType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      accessKeyId: '',
      secretAccessKey: '',
      region: ''
    }
  })
  return (
    <StyledForm>
      <TextField
        label="Access key id"
        variant="outlined"
        size="small"
        {...register('accessKeyId', {
          required: 'This field is required.',
          onChange: () => {
            setAwsCredential((prevState) => ({
              ...prevState,
              accessKeyId: getValues().accessKeyId
            }))
          }
        })} />
      <TextField
        label="Secret Key"
        variant="outlined"
        size="small"
        {...register('secretAccessKey', {
          required: 'This field is required.',
          onChange: () => {
            setAwsCredential((prevState) => ({
              ...prevState,
              secretAccessKey: getValues().secretAccessKey
            }))
          }
        })} />
      <TextField
        label="Region"
        variant="outlined"
        size="small"
        {...register('region', {
          required: 'This field is required.',
          onChange: () => {
            setAwsCredential((prevState) => ({
              ...prevState,
              region: getValues().region
            }))
          }
        })} />
    </StyledForm>
  )
}

const StyledForm = styled.form``

export default AwsCredentialForm
