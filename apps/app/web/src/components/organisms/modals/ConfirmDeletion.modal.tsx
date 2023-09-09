import { deleteMetricMutation } from '../../../services/dashboard.service'
import { ActiveMetricModel } from '@metrikube/core'
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
  metric: ActiveMetricModel
}

interface ConfirmDeletionForm {
  confirmDeletion: string
}

const ConfirmDeletionModal = ({ open, setOpenModal, metric }: Props) => {
  const { register, watch, reset } = useForm<ConfirmDeletionForm>()

  const confirmDeletionValue = watch('confirmDeletion')
  const [shouldDisableDeletionButton, setShouldDisableDeletionButton] = useState(true)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (confirmDeletionValue && confirmDeletionValue === 'SUPPRIMER') {
      setShouldDisableDeletionButton(false)
    } else {
      setShouldDisableDeletionButton(true)
    }
  }, [confirmDeletionValue])

  const { mutate: deleteMetric } = deleteMetricMutation(() => {
    queryClient.invalidateQueries({ queryKey: ['getActiveMetrics'] })
  })

  const handlerModalClose = () => {
    setOpenModal(false)
    reset()
  }

  const handleMetricDelete = (activeMetricId: string) => {
    deleteMetric(activeMetricId)
    handlerModalClose()
  }

  return (
    <Dialog open={open} onClose={handlerModalClose}>
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Supprimer : {metric?.metric.name}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form>
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlerModalClose}>Cancel</Button>
        <Button
          onClick={() => handleMetricDelete(metric.id)}
          disabled={shouldDisableDeletionButton}
          variant="outlined"
          color="error">
          SUPPRIMER
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeletionModal
