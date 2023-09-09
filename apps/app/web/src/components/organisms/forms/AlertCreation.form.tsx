import OutlinedCard from '../../molecules/OutlinedCard'
import { OPERATORS, Option } from '@metrikube/core'
import { FormControl, Select, MenuItem, Button, TextField, InputLabel } from '@mui/material'
import React from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'

type Props = {
  metricFields: Option[]
}

const AlertCreationForm = ({ metricFields = [] }: Props) => {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'widgetAlerts'
  })

  return (
    <div>
      {fields.map((item, index) => (
        <OutlinedCard key={`alert-form-${index}`} title="Notifications">
          <div>
            <TextField
              id="alert-label"
              label="titre d'alerte"
              // error={Boolean(errors.widgetAlerts[index] || 0)}
              // helperText={errors.widgetAlerts[index].label.message as string}
              variant="outlined"
              size="small"
              {...register(`widgetAlerts.${index}.label`, { required: 'Required' })}
            />
          </div>
          <FormControl fullWidth>
            <InputLabel id="field">Champs</InputLabel>
            <Select
              labelId="field"
              id="field"
              placeholder="Select a field"
              variant="outlined"
              size="small"
              // error={Boolean(errors.widgetAlerts[index])}
              // helperText={errors.widgetAlerts[index].condition.field.message as string}
              {...register(`widgetAlerts.${index}.condition.field`, { required: 'Required' })}>
              {metricFields.map((metricField, index) => (
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
              placeholder="Select an operator"
              variant="outlined"
              size="small"
              // error={Boolean(errors.widgetAlerts[index])}
              // helperText={errors.widgetAlerts[index].condition.operator.message as string}
              {...register(`widgetAlerts.${index}.condition.operator`, { required: 'Required' })}>
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
            // error={Boolean(errors.widgetAlerts[index])}
            // helperText={errors.widgetAlerts[index].condition.threshold.message as string}
            {...register(`widgetAlerts.${index}.condition.threshold`, { required: 'Required' })}
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
    </div>
  )
}

export default AlertCreationForm
