import PluginEmptyStateImg from '../assets/img/undraws/undraw_online_stats.svg'
import Loader from '../components/atoms/Loader'
import ConfirmDeletionModal from '../components/organisms/modals/ConfirmDeletion.modal'
import ProviderModal from '../components/organisms/modals/Provider.modal'
import WidgetAlertsModal from '../components/organisms/modals/WidgetAlerts.modal'
import { useAdapter } from '../config/axios'
import dayjs from '../config/dayjs'
import { DashboardContext } from '../contexts/Dashboard.context'
import { SetupPluginProvider } from '../contexts/SetupPlugin.context'
import DefaultLayout from '../layouts/DefaultLayout'
import { EmptyStateLayout } from '../layouts/EmptyStateLayout'
import { WidgetsLayout } from '../layouts/WidgetsLayout'
import {
  getNotificationsQuery,
  getWidgetsQuery,
  resetTriggeredAlertMutation
} from '../services/dashboard.service'
import styled from '@emotion/styled'
import {
  GetNotificationsUsecase,
  GetWidgetsUsecase,
  NotificationModel,
  WidgetModel
} from '@metrikube/core'
import { AddchartOutlined } from '@mui/icons-material'
import VerifiedIcon from '@mui/icons-material/Verified'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Alert, Box, Button, Collapse, Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'

const metrikubeLogo = new URL(`/src/assets/img/metrikube-logo.png`, import.meta.url).href

const Dashboard = () => {
  const { widgets, setWidgets } = useContext(DashboardContext)

  const [openedModal, setOpenModal] = useState(false)
  const [isWidgetAlertsModalOpen, setIsWidgetAlertsModalOpen] = useState(false)
  const [isMetricDeletionModalOpened, setIsMetricDeletionModalOpened] = useState(false)
  const [selectedWidget, setSelectedWidget] = useState<WidgetModel | null>(null)
  const [notifications, setNotifications] = useState<NotificationModel[]>([])
  const [collapseChecked, setCollapseChecked] = useState(false)
  const queryClient = useQueryClient()
  const { dashboardMetricsAdapter } = useAdapter()

  const { mutate: resetTriggeredAlert } = resetTriggeredAlertMutation(() => {
    queryClient.invalidateQueries({ queryKey: ['getNotifications'] })
    if (notifications.length === 0) setCollapseChecked(false)
  })

  const { isSuccess: isWidgetSuccess, isFetching: isWidgetFetching } = getWidgetsQuery(
    (widgets: WidgetModel[]) => {
      setWidgets(widgets)
    }
  )

  const { isSuccess: isNotificationsSuccess } = getNotificationsQuery(
    (notfications: NotificationModel[]) => {
      setNotifications(notfications)
    }
  )

  useEffect(() => {
    const getWidgetUsecase = new GetWidgetsUsecase(dashboardMetricsAdapter)
    const execution = getWidgetUsecase.execute({
      onMessage: (event) => {
        setWidgets(JSON.parse(event.data) as WidgetModel[])
      },
      onClose: () => {
        console.info('GetWidgets usecase - Eventsource closed')
      }
    })

    return () => {
      execution.close()
    }
  }, [])

  useEffect(() => {
    const getNotificationsUsecase = new GetNotificationsUsecase(dashboardMetricsAdapter)
    getNotificationsUsecase.execute().onmessage = (event) => {
      setNotifications(JSON.parse(event.data))
    }

    return () => {
      getNotificationsUsecase.execute().close = () => {
        console.info('GetNotifications usecase - Eventsource closed')
      }
    }
  }, [])

  const openProviderModalHandler = () => {
    setOpenModal(true)
  }

  const handleAlertOpenRequest = (widget: WidgetModel) => {
    setSelectedWidget(widget)
    setIsWidgetAlertsModalOpen(true)
  }

  const handleMetricDeletionRequest = (widget: WidgetModel) => {
    setSelectedWidget(widget)
    setIsMetricDeletionModalOpened(true)
  }

  return (
    <>
      <StyledHeader>
        <Brand>
          <img src={metrikubeLogo} style={{ height: '45px' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            MetriKube
          </Typography>
        </Brand>
        <div>
          <Button
            onClick={openProviderModalHandler}
            size="medium"
            variant="contained"
            startIcon={<AddchartOutlined />}>
            Ajouter un widget
          </Button>
        </div>
      </StyledHeader>
      <DefaultLayout>
        <>
          {isNotificationsSuccess && notifications.length > 0 && (
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
                  ? `${notifications.length} alertes se sont déclanchées`
                  : `${notifications.length} alerte s'est déclanchée`}
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
          )}
          {isWidgetFetching ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%'
              }}>
              <Loader />
            </Box>
          ) : isWidgetSuccess && !widgets.length ? (
            <EmptyStateLayout
              title="Commencer par ajouter un widget"
              description="Les widgets sont le coeur de Metrikube, Ils permettent de visualiser vos métriques."
              onActionButtonClick={openProviderModalHandler}
              buttonLabel="Ajouter un widget"
              imageAsset={PluginEmptyStateImg}
              buttonIcon={AddchartOutlined}
            />
          ) : (
            <WidgetsLayout
              widgets={widgets}
              onAlertOpenRequest={handleAlertOpenRequest}
              onMetricDeletionRequest={handleMetricDeletionRequest}
            />
          )}
        </>
        <SetupPluginProvider>
          <ProviderModal open={openedModal} setOpenModal={setOpenModal} />
        </SetupPluginProvider>

        {selectedWidget && (
          <>
            {isWidgetAlertsModalOpen && (
              <WidgetAlertsModal
                open={isWidgetAlertsModalOpen}
                setOpenModal={setIsWidgetAlertsModalOpen}
                widget={selectedWidget}
              />
            )}

            {isMetricDeletionModalOpened && (
              <ConfirmDeletionModal
                open={isMetricDeletionModalOpened}
                setOpenModal={setIsMetricDeletionModalOpened}
                widget={selectedWidget}
              />
            )}
          </>
        )}
      </DefaultLayout>
    </>
  )
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: fixed;
  width: 100%;
  padding: 1rem;
  top: 0;
  background-color: ${({ theme }) => theme.palette.background.default};
  z-index: 10;
`

const Brand = styled(Box)`
  display: flex;
  column-gap: ${({ theme }) => theme.spacing(2)};
  align-items: center;
  justify-content: center;
`

export default Dashboard
