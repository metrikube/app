import { SetupPluginContext } from '../../../contexts/SetupPlugin.context'
import { getAlertFieldsQuery } from '../../../services/dashboard.service'
import OutlinedCard from '../../molecules/OutlinedCard'
import { OPERATORS } from '@metrikube/core'
import { TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material'
import React, { useContext } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

const ProviderFormStep3 = () => {
  const { selectedMetric } = useContext(SetupPluginContext)
  const { data: alertFields } = getAlertFieldsQuery(selectedMetric?.id)

  const {
    register,
    control,
    formState: { errors }
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'metricAlerts'
  })

  return (
    <>
      {fields.map((item, index) => (
        <OutlinedCard key={`alert-form-${index}`} title="Notifications">
          <div>
            <TextField
              id="alert-label"
              label="Titre d'alerte"
              // error={Boolean(errors.metricAlerts[index] || 0)}
              // helperText={errors.metricAlerts[index].label.message as string}
              variant="outlined"
              size="small"
              {...register(`metricAlerts.${index}.label`, { required: 'Required' })}
            />
          </div>
          <FormControl fullWidth>
            <InputLabel id="field">Champs</InputLabel>
            <Select
              labelId="field"
              id="field"
              placeholder="Choisissez un champs"
              variant="outlined"
              size="small"
              // error={Boolean(errors.metricAlerts[index])}
              // helperText={errors.metricAlerts[index].condition.field.message as string}
              {...register(`metricAlerts.${index}.condition.field`, { required: 'Required' })}>
              {alertFields.map((metricField, index) => (
                <MenuItem key={index} value={metricField.value}>
                  {metricField.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="operator">Opérateur</InputLabel>
            <Select
              labelId="operator"
              id="operator"
              placeholder="Sélectionnez un opérateur"
              variant="outlined"
              size="small"
              // error={Boolean(errors.metricAlerts[index])}
              // helperText={errors.metricAlerts[index].condition.operator.message as string}
              {...register(`metricAlerts.${index}.condition.operator`, { required: 'Required' })}>
              {OPERATORS.map((operator, index) => (
                <MenuItem key={index} value={operator.value}>
                  {operator.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="threshold"
            label="Seuil"
            variant="outlined"
            size="small"
            // error={Boolean(errors.metricAlerts[index])}
            // helperText={errors.metricAlerts[index].condition.threshold.message as string}
            {...register(`metricAlerts.${index}.condition.threshold`, { required: 'Required' })}
          />
          <Button onClick={() => remove(index)} size="small" color="error" variant="outlined">
            Supprimer
          </Button>
        </OutlinedCard>
      ))}
      <Button
        onClick={() => {
          append({ label: '', condition: { field: '', operator: 'gt', threshold: '' } })
        }}
        size="small"
        variant="outlined">
        Ajouter une alerte
      </Button>
    </>
  )
}

export default ProviderFormStep3
