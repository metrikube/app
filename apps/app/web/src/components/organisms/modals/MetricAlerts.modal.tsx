import { DashboardContext } from '../../../contexts/Dashboard.context'
import { getActiveMetricAlertQuery } from '../../../services/dashboard.service'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton
} from '@mui/material'
import React, { Dispatch, SetStateAction, useContext } from 'react'

interface Props {
  open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const MetricAlertsModal = ({ open, setOpenModal }: Props) => {
  const { selectedActiveMetric } = useContext(DashboardContext)
  const { data: alerts } = getActiveMetricAlertQuery('3bb59e4c-271a-4b2a-b932-3c6578d9f52e')

  const toggleNotification = (alertId: string, isActive: boolean) => {
    console.log(alertId, 'alertId')
    console.log(!isActive, 'isActive')
  }

  const deleteAlert = (alertId: string) => {
    console.log(alertId)
  }
  return (
    <Dialog open={open} onClose={() => setOpenModal(false)}>
      <DialogTitle>Alertes {selectedActiveMetric?.metric.name}</DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Label</TableCell>
              <TableCell align="right">Activé</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alerts.length &&
              alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>{alert.label}</TableCell>
                  <TableCell align="right">
                    {alert.isActive ? (
                      <IconButton
                        onClick={() => toggleNotification(alert.id, alert.isActive)}
                        aria-label="alert-on">
                        <NotificationsActiveOutlinedIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => toggleNotification(alert.id, alert.isActive)}
                        aria-label="alert-off">
                        <NotificationsOffOutlinedIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      size="large"
                      onClick={() => deleteAlert(alert.id)}
                      aria-label="delete-alert">
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}

export default MetricAlertsModal
