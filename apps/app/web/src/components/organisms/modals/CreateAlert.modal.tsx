import {
  GET_WIDGETS_QUERY_KEY,
  GET_WIDGET_ALERTS_QUERY_KEY,
  getAlertFieldsQuery
} from '../../../services/dashboard.service'
import { createAlertsMutation } from '../../../services/plugin.service'
import AlertCreationForm from '../forms/AlertCreation.form'
import { WidgetModel, AlertForm, mapToAlertRequest } from '@metrikube/core'
import { Dialog, DialogContent, Button, DialogTitle } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import React, { Dispatch, SetStateAction } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

interface Props {
  open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  widget: WidgetModel
}

const CreateAlertModal = ({ open, setOpenModal, widget }: Props) => {
  const queryClient = useQueryClient()
  const methods = useForm<{ widgetAlerts: AlertForm[] }>({
    mode: 'all',
    defaultValues: {
      widgetAlerts: []
    }
  })

  const { mutate: createAlert } = createAlertsMutation(() => {
    queryClient.invalidateQueries({ queryKey: [GET_WIDGET_ALERTS_QUERY_KEY] })
    queryClient.invalidateQueries({ queryKey: [GET_WIDGETS_QUERY_KEY] })
  })

  const { data: alertFields } = getAlertFieldsQuery(widget.metric.id)

  const triggerModalClose = () => {
    setOpenModal(false)
    methods.reset()
  }

  const onSubmit = (data: { widgetAlerts: AlertForm[] }) => {
    createAlert({
      widgetId: widget.id,
      alerts: mapToAlertRequest(data.widgetAlerts, widget.metric.id)
    })
    triggerModalClose()
  }

  return (
    <Dialog open={open} onClose={triggerModalClose} maxWidth="lg">
      <DialogTitle>
        <span>Ajouter des alertes</span>
      </DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <AlertCreationForm alertFields={alertFields} />
            <Button
              type="submit"
              variant="contained"
              sx={{ width: '100%', mt: '8px' }}
              size="large">
              Confirmer la création des alertes
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{ width: '100%', mt: '8px' }}
              size="large"
              onClick={triggerModalClose}>
              Annuler
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

export default CreateAlertModal
