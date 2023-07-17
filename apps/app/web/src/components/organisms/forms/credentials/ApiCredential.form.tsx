import { TextField } from '@mui/material'
import { PluginContext } from 'apps/app/web/src/contexts/plugin.context'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'

const ApiCredentialForm = () => {
  const { setApiHealthCheckCredential } = useContext(PluginContext)

  const {
    register,
    getValues,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      apiEndpoint: ''
    }
  })

  return (
    <>
      <TextField
        fullWidth
        id="api-endpoint"
        label="API Endpoint"
        variant="outlined"
        size="small"
        error={Boolean(errors.apiEndpoint)}
        helperText={errors.apiEndpoint?.message}
        placeholder="Example: https://jsonplaceholder.typicode.com/users"
        {...register('apiEndpoint', {
          required: 'This field is required.',
          onChange: () => {
            setApiHealthCheckCredential((prevState) => ({
              ...prevState,
              apiEndpoint: getValues().apiEndpoint
            }))
          }
        })}
      />
    </>
  )
}

export default ApiCredentialForm
