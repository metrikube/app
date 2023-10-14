import PluginEmptyStateImg from '../assets/img/undraws/undraw_online_stats.svg'
import Loader from '../components/atoms/Loader'
import { Notifications } from '../components/molecules/Notifications'
import ConfirmDeletionModal from '../components/organisms/modals/ConfirmDeletion.modal'
import ProviderModal from '../components/organisms/modals/Provider.modal'
import WidgetAlertsModal from '../components/organisms/modals/WidgetAlerts.modal'
import { useAdapter } from '../config/axios'
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
  WidgetModel,
  widgetsMock
} from '@metrikube/core'
import { AddchartOutlined } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import React, { useContext, useEffect, useRef, useState } from 'react'

const metrikubeLogo = new URL(`/src/assets/img/metrikube-logo.png`, import.meta.url).href

const Dashboard = () => {
  const { widgets, setWidgets } = useContext(DashboardContext)

  const scrollPosition = useRef(0)

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
        scrollPosition.current = window.scrollY
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
      scrollPosition.current = window.scrollY
      setNotifications(JSON.parse(event.data))
    }

    return () => {
      getNotificationsUsecase.execute().close = () => {
        console.info('GetNotifications usecase - Eventsource closed')
      }
    }
  }, [])

  useEffect(() => {
    if (scrollPosition.current) {
      window.scrollTo(0, scrollPosition.current)
    }
  }, [widgets, notifications])

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
            <Notifications
              setCollapseChecked={setCollapseChecked}
              collapseChecked={collapseChecked}
              notifications={notifications}
              resetTriggeredAlert={resetTriggeredAlert}
            />
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
              widgets={widgetsMock}
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
