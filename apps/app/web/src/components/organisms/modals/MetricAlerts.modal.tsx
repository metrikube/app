import { DashboardContext } from '../../../contexts/Dashboard.context'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React, { Dispatch, SetStateAction, useContext } from 'react'

interface Props {
  open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const MetricAlertsModal = ({ open, setOpenModal }: Props) => {
  const { selectedActiveMetric } = useContext(DashboardContext)
  return (
    <Dialog open={open} onClose={() => setOpenModal(false)}>
      <DialogTitle>Alertes {selectedActiveMetric?.metric.name}</DialogTitle>
      <DialogContent></DialogContent>
    </Dialog>
  )
}

export default MetricAlertsModal
