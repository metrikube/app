import { DashboardContext } from '../../../contexts/Dashboard.context'
import { deleteMetricMutation } from '../../../services/dashboard.service'
import { Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button } from '@mui/material'
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

interface ConfirmDeletionForm {
  confirmDeletion: string
}

const ConfirmDeletionModal = ({ open, setOpenModal }: Props) => {
  const { selectedActiveMetric } = useContext(DashboardContext)
  const { register, watch, reset } = useForm<ConfirmDeletionForm>()

  const confirmDeletionValue = watch('confirmDeletion')
  const [shouldDisableDeletionButton, setShouldDisableDeletionButton] = useState(true)

  useEffect(() => {
    if (confirmDeletionValue && confirmDeletionValue === 'SUPPRIMER') {
      setShouldDisableDeletionButton(false)
    } else {
      setShouldDisableDeletionButton(true)
    }
  }, [confirmDeletionValue, setShouldDisableDeletionButton])

  const { mutate: deleteMetric } = deleteMetricMutation()

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
      <DialogTitle>Supprimer : {selectedActiveMetric?.metric.name}</DialogTitle>
      <DialogContent>
        <form>
          <p>Pour confirmer la suppression</p>
          <TextField
            fullWidth
            label="SUPPRIMER"
            helperText="Vous devez écrire SUPPRIMER"
            variant="outlined"
            size="small"
            {...register('confirmDeletion')}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlerModalClose}>Cancel</Button>
        <Button
          onClick={() => handleMetricDelete(selectedActiveMetric.id)}
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
