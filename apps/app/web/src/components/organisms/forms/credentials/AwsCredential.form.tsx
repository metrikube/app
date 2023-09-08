import { TextField } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const AwsCredentialForm = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <>
      <TextField
        label="Access key id"
        variant="outlined"
        size="small"
        error={Boolean(errors.aws?.accessKeyId)}
        helperText={errors.aws?.accessKeyId?.message}
        {...register('aws.accessKeyId', {
          required: 'Ce champs est obligatoire'
        })}
      />
      <TextField
        label="Secret Key"
        variant="outlined"
        size="small"
        error={Boolean(errors.aws?.secretAccessKey)}
        helperText={errors.aws?.secretAccessKey?.message}
        {...register('aws.secretAccessKey', {
          required: 'Ce champs est obligatoire'
        })}
      />
      <TextField
        label="Region"
        variant="outlined"
        size="small"
        error={Boolean(errors.aws?.region)}
        helperText={errors.aws?.region?.message}
        {...register('aws.region', {
          required: 'Ce champs est obligatoire'
        })}
      />
    </>
  )
}

export default AwsCredentialForm
