import {
  deleteAlertMutation,
  getActiveMetricAlertsQuery,
  toggleAlertMutation
} from '../../../services/dashboard.service'
import Loader from '../../atoms/Loader'
import CreateAlertModal from './CreateAlert.modal'
import { ActiveMetricModel } from '@metrikube/core'
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined'
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
  IconButton,
  Button,
  Box
} from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface Props {
  open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  metric: ActiveMetricModel
}

const MetricAlertsModal = ({ open, setOpenModal, metric }: Props) => {
  const queryClient = useQueryClient()
  const { data: alerts, refetch, isFetched, isFetching } = getActiveMetricAlertsQuery(metric.id)
  const [isOpened, setIsOpened] = useState(false)

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

  const openModal = () => {
    setIsOpened(true)
  }

  return (
    <Dialog open={open} onClose={() => setOpenModal(false)}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Alertes {metric?.metric.name}</span>{' '}
        <Button
          onClick={openModal}
          size="small"
          variant="contained"
          startIcon={<AddAlertOutlinedIcon />}>
          Ajouter une alerte
        </Button>
      </DialogTitle>
      <DialogContent>
        {isFetching ? (
          <Loader />
        ) : alerts.length ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Label</TableCell>
                <TableCell align="right">Activé</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alerts.map((alert) => (
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
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
            <p>Pas d'alerte</p>
            <Button
              onClick={openModal}
              size="small"
              variant="contained"
              startIcon={<AddAlertOutlinedIcon />}>
              Ajouter une alerte
            </Button>
          </Box>
        )}
      </DialogContent>
      {isOpened && <CreateAlertModal open={isOpened} setOpenModal={setIsOpened} widget={metric} />}
    </Dialog>
  )
}

export default MetricAlertsModal
