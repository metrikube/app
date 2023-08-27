import { DashboardContext } from '../../../contexts/Dashboard.context'
import { Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button } from '@mui/material'
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

type ConfirmDeletionForm = {
  confirmDeletion: string
}

const ConfirmDeletionModal = ({ open, setOpenModal }: Props) => {
  const { selectedActiveMetric } = useContext(DashboardContext)
  const {
    register,
    getValues,
    formState: { errors }
  } = useForm<ConfirmDeletionForm>()

  useEffect(() => {
    console.log(getValues().confirmDeletion)
  }, [getValues().confirmDeletion])

  return (
    <Dialog open={open} onClose={() => setOpenModal(false)}>
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
        <Button onClick={() => setOpenModal(false)}>Cancel</Button>
        <Button disabled={false} variant="outlined" color="error">
          SUPPRIMER
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeletionModal
