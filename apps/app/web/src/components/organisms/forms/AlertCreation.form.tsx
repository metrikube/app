import OutlinedCard from '../../molecules/OutlinedCard'
import styled from '@emotion/styled'
import { OPERATORS, Option } from '@metrikube/core'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { FormControl, Select, MenuItem, Button, TextField, InputLabel } from '@mui/material'
import React, { useEffect } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'

type Props = {
  alertFields: Option[]
  noDefaultForm?: boolean
}

const AlertCreationForm = ({ alertFields = [], noDefaultForm }: Props) => {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'widgetAlerts'
  })

  useEffect(() => {
    if (fields.length === 0 && !noDefaultForm) {
      append({ label: '', condition: { field: '', operator: 'gt', threshold: '' } })
    }
  }, [fields])

  return (
    <div>
      {fields.map((item, index) => (
        <OutlinedCard key={`alert-form-${index}`}>
          <div>
            <TextField
              size="small"
              id="alert-label"
              label="Titre de l'alerte"
              // error={Boolean(errors.widgetAlerts[index] || 0)}
              // helperText={errors.widgetAlerts[index].label.message as string}
              variant="outlined"
              {...register(`widgetAlerts.${index}.label`, { required: 'Required' })}
            />
          </div>

          <ComparisonInputs>
            <FormControl size="small" sx={{ m: 1, minWidth: 250 }}>
              <InputLabel id="field-to-observe">Champ à observer</InputLabel>
              <Select
                labelId="field-to-observe"
                id="field-to-observe"
                label="Champ à observer"
                autoWidth
                // error={Boolean(errors.widgetAlerts[index])}
                // helperText={errors.widgetAlerts[index].condition.field.message as string}
                {...register(`widgetAlerts.${index}.condition.field`, { required: 'Required' })}>
                {alertFields.map((alertFields, index) => (
                  <MenuItem key={index} value={alertFields.value}>
                    {alertFields.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ m: 1, minWidth: 280 }}>
              <InputLabel id="operator">Opérateur de comparaison</InputLabel>
              <Select
                labelId="operator"
                id="operator"
                label="Opérateur de comparaison"
                variant="outlined"
                autoWidth
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
              label="Valeur de comparaison"
              variant="outlined"
              size="small"
              // error={Boolean(errors.widgetAlerts[index])}
              // helperText={errors.widgetAlerts[index].condition.threshold.message as string}
              {...register(`widgetAlerts.${index}.condition.threshold`, { required: 'Required' })}
            />
          </ComparisonInputs>

          {fields.length > 1 && (
            <DeleteButton onClick={() => remove(index)} size="small" color="error">
              <CancelOutlinedIcon />
            </DeleteButton>
          )}
        </OutlinedCard>
      ))}
      <AddAlertBtn
        onClick={() => {
          append({ label: '', condition: { field: '', operator: 'gt', threshold: '' } })
        }}
        size="large"
        variant="outlined">
        <ControlPointIcon sx={{ mr: '8px' }} />
        Nouvelle alerte
      </AddAlertBtn>
    </div>
  )
}

const AddAlertBtn = styled(Button)`
  width: 100%;
  border-style: dashed;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`

const DeleteButton = styled(Button)`
  position: absolute;
  width: fit-content;
  min-width: 0;
  right: 30px;
`

const ComparisonInputs = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: -8px;
`

export default AlertCreationForm
