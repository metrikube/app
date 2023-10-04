import AlertEmptyStateLayout from '../../../assets/img/undraws/undraw_warning_re_eoyh.svg'
import { EmptyStateLayout } from '../../../layouts/EmptyStateLayout'
import {
  GET_WIDGETS_QUERY_KEY,
  GET_WIDGET_ALERTS_QUERY_KEY,
  deleteAlertMutation,
  getWidgetAlertsQuery,
  toggleAlertMutation
} from '../../../services/dashboard.service'
import Loader from '../../atoms/Loader'
import CreateAlertModal from './CreateAlert.modal'
import { WidgetModel } from '@metrikube/core'
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface Props {
  open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  widget: WidgetModel
}

const WidgetAlertsModal = ({ open, setOpenModal, widget }: Props) => {
  const queryClient = useQueryClient()
  const {
    data: alerts,
    refetch,
    isFetched,
    isFetching,
    isInitialLoading
  } = getWidgetAlertsQuery(widget.id)
  const [isOpened, setIsOpened] = useState(false)

  useEffect(() => {
    if (isFetched) {
      refetch()
    }
  }, [widget])

  const { mutate: toggleNotification } = toggleAlertMutation(() => {
    queryClient.invalidateQueries({ queryKey: [GET_WIDGET_ALERTS_QUERY_KEY] })
  })
  const { mutate: deleteAlert } = deleteAlertMutation(() => {
    queryClient.invalidateQueries({ queryKey: [GET_WIDGET_ALERTS_QUERY_KEY] })
    queryClient.invalidateQueries({ queryKey: [GET_WIDGETS_QUERY_KEY] })
  })

  const openModal = () => {
    setIsOpened(true)
  }

  return (
    <Dialog open={open} onClose={() => setOpenModal(false)}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>
          Alertes pour : <strong>{widget.name}</strong>
        </span>{' '}
        {Boolean(alerts.length) && (
          <Button
            onClick={openModal}
            size="small"
            variant="contained"
            startIcon={<AddAlertOutlinedIcon />}>
            Ajouter une alerte
          </Button>
        )}
      </DialogTitle>
      <DialogContent>
        {isFetching && isInitialLoading ? (
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
                  <TableCell align="right">
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
          <EmptyStateLayout
            title="Aucune alerte pour ce widget"
            description="Créez une alerte pour être notifié en cas de dépassement de seuil."
            onActionButtonClick={openModal}
            buttonLabel="Ajouter une alerte"
            imageAsset={AlertEmptyStateLayout}
            buttonIcon={AddAlertOutlinedIcon}
          />
        )}
      </DialogContent>
      {isOpened && <CreateAlertModal open={isOpened} setOpenModal={setIsOpened} widget={widget} />}
    </Dialog>
  )
}

export default WidgetAlertsModal
