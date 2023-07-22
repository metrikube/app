import { TextField } from '@mui/material'
import { SetupPluginContext } from 'apps/app/web/src/contexts/SetupPlugin.context'
import React, { useContext, useEffect } from 'react'
import { useForm, useFormContext } from 'react-hook-form'

const ApiCredentialForm = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <>
      <TextField
        fullWidth
        id="api-endpoint"
        label="API Endpoint"
        variant="outlined"
        size="small"
        error={Boolean(errors.api_endpoint?.apiEndpoint)}
        helperText={errors.api_endpoint?.apiEndpoint?.message}
        placeholder="Example: https://jsonplaceholder.typicode.com/users"
        {...register('api_endpoint.apiEndpoint', {
          required: 'This field is required.'
        })}
      />
    </>
  )
}

export default ApiCredentialForm
