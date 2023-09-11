import { getAlertFieldsQuery } from '../../../services/dashboard.service'
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
    queryClient.invalidateQueries({ queryKey: ['getWidgetAlerts'] })
  })

  const { data: alertFields } = getAlertFieldsQuery(widget.metric.id)

  const handlerModalClose = () => {
    setOpenModal(false)
    methods.reset()
  }

  const onSubmit = (data: { widgetAlerts: AlertForm[] }) => {
    createAlert({
      widgetId: widget.id,
      alerts: mapToAlertRequest(data.widgetAlerts, widget.metric.id)
    })
    handlerModalClose()
  }

  return (
    <Dialog open={open} onClose={handlerModalClose}>
      <DialogTitle>
        <span>Ajouter une alerte</span>
      </DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <AlertCreationForm alertFields={alertFields} />
            <Button type="submit" disabled={!methods.getValues().widgetAlerts.length}>
              Confirmer
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

export default CreateAlertModal
