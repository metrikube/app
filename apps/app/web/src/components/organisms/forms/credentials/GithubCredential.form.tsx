import { TextField } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const GithubCredentialForm = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()
 
  return (
    <>
      <TextField
        multiline
        label="Accès Token"
        variant="outlined"
        size="small"
        {...register('github.accessToken', {
          required: 'This field is required.'
        })}
      />
      <TextField
        label="Propriétaire"
        variant="outlined"
        size="small"
        {...register('github.owner', {
          required: 'This field is required.'
        })}
      />
      <TextField
        label="Repository"
        variant="outlined"
        size="small"
        {...register('github.repo', {
          required: 'This field is required.'
        })}
      />
    </>
  )
}

export default GithubCredentialForm
