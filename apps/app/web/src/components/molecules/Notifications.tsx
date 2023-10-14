import dayjs from '../../config/dayjs'
import { NotificationModel } from '@metrikube/core'
import VerifiedIcon from '@mui/icons-material/Verified'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Alert, Button, Collapse } from '@mui/material'
import React from 'react'

export const Notifications = ({
  setCollapseChecked,
  collapseChecked,
  notifications,
  resetTriggeredAlert
}: {
  setCollapseChecked: React.Dispatch<React.SetStateAction<boolean>>
  collapseChecked: boolean
  notifications: NotificationModel[]
  resetTriggeredAlert: (id: string) => void
}) => (
  <section>
    <Alert
      onClick={() => setCollapseChecked((prevState) => !prevState)}
      sx={{
        marginY: 1,
        '&:hover': {
          cursor: 'pointer'
        }
      }}
      severity="error"
      action={
        <Button
          sx={{ textTransform: 'none' }}
          variant="text"
          endIcon={collapseChecked ? <VisibilityOffIcon /> : <VisibilityIcon />}
          disableRipple>
          {collapseChecked ? 'Masquer' : 'Afficher'}
        </Button>
      }>
      {notifications.length > 1
        ? `${notifications.length} alertes se sont déclenchées`
        : `${notifications.length} alerte s'est déclenchée`}
    </Alert>
    <Collapse in={collapseChecked}>
      {notifications.map((notification) => (
        <Alert
          key={notification.id}
          sx={{ marginY: 1, alignItems: 'center' }}
          severity="warning"
          action={
            <Button
              sx={{ textTransform: 'none' }}
              onClick={() => resetTriggeredAlert(notification.id)}
              color="inherit"
              endIcon={<VerifiedIcon />}
              size="small">
              Marquer comme résolu
            </Button>
          }>
          <p>
            {notification.widgetName} - {notification.title}
          </p>
          <small>{dayjs(notification.triggeredAt).fromNow()}</small>
        </Alert>
      ))}
    </Collapse>
  </section>
)
