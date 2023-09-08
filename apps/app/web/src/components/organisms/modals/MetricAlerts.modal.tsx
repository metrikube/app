import {
  deleteAlertMutation,
  getActiveMetricAlertsQuery,
  toggleAlertMutation
} from '../../../services/dashboard.service'
import { ActiveMetricModel } from '@metrikube/core'
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
import { useQueryClient } from '@tanstack/react-query'
import React, { Dispatch, SetStateAction, useEffect } from 'react'

interface Props {
  open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  metric: ActiveMetricModel
}

const MetricAlertsModal = ({ open, setOpenModal, metric }: Props) => {
  const queryClient = useQueryClient()
  const { data: alerts, refetch, isFetched } = getActiveMetricAlertsQuery(metric.id)

  useEffect(() => {
    if (isFetched) {
      refetch()
    }
  }, [metric])

  const { mutate: toggleNotification } = toggleAlertMutation(() => {
    queryClient.invalidateQueries({ queryKey: ['getActiveMetricAlert'] })
  })
  const { mutate: deleteAlert } = deleteAlertMutation(() => {
    queryClient.invalidateQueries({ queryKey: ['getActiveMetricAlert'] })
  })

  return (
    <Dialog open={open} onClose={() => setOpenModal(false)}>
      <DialogTitle>Alertes {metric?.metric.name}</DialogTitle>
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
                        onClick={() =>
                          toggleNotification({ alertId: alert.id, isActive: !alert.isActive })
                        }
                        aria-label="alert-on">
                        <NotificationsActiveOutlinedIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() =>
                          toggleNotification({ alertId: alert.id, isActive: !alert.isActive })
                        }
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
