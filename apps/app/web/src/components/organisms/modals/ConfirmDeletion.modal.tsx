import { deleteWidgetMutation } from '../../../services/dashboard.service'
import { WidgetModel } from '@metrikube/core'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
  Typography
} from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  widget: WidgetModel
}

interface ConfirmDeletionForm {
  confirmDeletion: string
}

const ConfirmDeletionModal = ({ open, setOpenModal, widget }: Props) => {
  const { register, watch, reset } = useForm<ConfirmDeletionForm>()

  const confirmDeletionValue = watch('confirmDeletion')
  const [shouldDisableDeletionButton, setShouldDisableDeletionButton] = useState(true)
  const queryClient = useQueryClient()

  useEffect(() => {
    confirmDeletionValue && confirmDeletionValue === 'SUPPRIMER'
      ? setShouldDisableDeletionButton(false)
      : setShouldDisableDeletionButton(true)
  }, [confirmDeletionValue])

  const { mutate: deleteWidget } = deleteWidgetMutation(() => {
    queryClient.invalidateQueries({ queryKey: ['getWidgets'] })
  })

  const handlerModalClose = () => {
    setOpenModal(false)
    reset()
  }

  const handleWidgetDelete = (widgetId: string) => {
    deleteWidget(widgetId)
    handlerModalClose()
  }

  return (
    <Dialog open={open} onClose={handlerModalClose}>
      <DialogTitle>
        <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
          Supprimer : {widget?.metric.name}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={() => handleWidgetDelete(widget.id)}>
          <Typography sx={{ mb: '15px' }}>
            Écrivez &apos;SUPPRIMER&apos; pour confirmer la suppression
          </Typography>
          <TextField
            fullWidth
            label="SUPPRIMER"
            variant="outlined"
            size="small"
            {...register('confirmDeletion')}
          />
          <DialogActions>
            <Button onClick={handlerModalClose}>Cancel</Button>
            <Button
              disabled={shouldDisableDeletionButton}
              type="submit"
              variant="outlined"
              color="error">
              SUPPRIMER
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDeletionModal
