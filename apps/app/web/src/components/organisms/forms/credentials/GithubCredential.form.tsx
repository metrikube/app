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
          required: 'Ce champs est obligatoire'
        })}
      />
      <TextField
        label="Propriétaire"
        variant="outlined"
        size="small"
        {...register('github.owner', {
          required: 'Ce champs est obligatoire'
        })}
      />
      <TextField
        label="Repository"
        variant="outlined"
        size="small"
        {...register('github.repo', {
          required: 'Ce champs est obligatoire'
        })}
      />
    </>
  )
}

export default GithubCredentialForm
