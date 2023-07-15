import { SetupPluginContext } from '../../../contexts/SetupPlugin.context'
import OutlinedCard from '../../molecules/OutlinedCard'
import { AlertForm, AlertRequest, OPERATORS } from '@metrikube/core'
import { TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

const ProviderFormStep3 = () => {
  const { metricFields, setMetricAlerts, selectedMetric } = useContext(SetupPluginContext)
  const { register, control, watch } = useForm<{ metricAlerts: AlertForm[] }>({
    defaultValues: {
      metricAlerts: [
        {
          label: '',
          condition: {
            field: '',
            operator: 'gt',
            threshold: ''
          }
        }
      ]
    }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'metricAlerts'
  })

  useEffect(() => {
    const subscription = watch(({ metricAlerts }, { name, type }) => {
      const alerts: AlertRequest[] = metricAlerts?.map((metricAlert) => ({
        ...metricAlert,
        metricId: selectedMetric && selectedMetric.id
      }))
      setMetricAlerts([...alerts])
    })
    return () => subscription.unsubscribe()
  }, [watch])
  return (
    <>
      {fields.map((item, index) => (
        <OutlinedCard key={`alert-form-${index}`} title="Notifications">
          <div>
            <TextField
              id="alert-label"
              label="titre d'alerte"
              variant="outlined"
              size="small"
              {...register(`metricAlerts.${index}.label`, { required: true })}
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
              {...register(`metricAlerts.${index}.condition.field`, { required: true })}>
              {Object.keys(metricFields).map((metricField, index) => (
                <MenuItem key={index} value={metricField}>
                  {metricField}
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
              {...register(`metricAlerts.${index}.condition.operator`, { required: true })}>
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
            {...register(`metricAlerts.${index}.condition.threshold`, { required: true })}
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
