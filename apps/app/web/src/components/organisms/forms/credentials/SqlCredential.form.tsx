import { TextField } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const DbCredentialForm = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <>
      <TextField
        label="Host"
        variant="outlined"
        size="small"
        error={Boolean(errors.sql_database?.dbHost)}
        helperText={errors.sql_database?.dbHost?.message}
        {...register('sql_database.dbHost', {
          required: 'Ce champs est obligatoire'
        })}
      />
      <TextField
        label="Database name"
        variant="outlined"
        size="small"
        error={Boolean(errors.sql_database?.dbName)}
        helperText={errors.sql_database?.dbName?.message}
        {...register('sql_database.dbName', {
          required: 'Ce champs est obligatoire'
        })}
      />
      <TextField
        label="Database port"
        variant="outlined"
        size="small"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        error={Boolean(errors.sql_database?.dbPort)}
        helperText={errors.sql_database?.dbPort?.message}
        {...register('sql_database.dbPort', {
          required: 'Ce champs est obligatoire'
        })}
      />
      <TextField
        label="Username"
        variant="outlined"
        size="small"
        error={Boolean(errors.sql_database?.dbUsername)}
        helperText={errors.sql_database?.dbUsername?.message}
        {...register('sql_database.dbUsername', {
          required: 'Ce champs est obligatoire'
        })}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        autoComplete="current-password"
        size="small"
        error={Boolean(errors.sql_database?.dbPassword)}
        helperText={errors.sql_database?.dbPassword?.message}
        {...register('sql_database.dbPassword', {
          required: 'Ce champs est obligatoire'
        })}
      />
    </>
  )
}

export default DbCredentialForm
