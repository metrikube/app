import PluginEmptyStateImg from '../assets/img/undraws/undraw_online_stats.svg'
import Loader from '../components/atoms/Loader'
import ConfirmDeletionModal from '../components/organisms/modals/ConfirmDeletion.modal'
import ProviderModal from '../components/organisms/modals/Provider.modal'
import WidgetAlertsModal from '../components/organisms/modals/WidgetAlerts.modal'
import { SetupPluginProvider } from '../contexts/SetupPlugin.context'
import DefaultLayout from '../layouts/DefaultLayout'
import { EmptyStateLayout } from '../layouts/EmptyStateLayout'
import { WidgetsLayout } from '../layouts/WidgetsLayout'
import { getWidgetsQuery } from '../services/dashboard.service'
import styled from '@emotion/styled'
import { WidgetModel, activeMetricsMock } from '@metrikube/core'
import { AddchartOutlined } from '@mui/icons-material'
import { Button, Box, Typography } from '@mui/material'
import React, { useState } from 'react'

const metrikubeLogo = new URL(`/src/assets/img/metrikube-logo.png`, import.meta.url).href

const Dashboard = () => {
  const [openedModal, setOpenModal] = useState(false)
  const [isWidgetAlertsModalOpen, setIsWidgetAlertsModalOpen] = useState(false)
  const [isMetricDeletionModalOpened, setIsMetricDeletionModalOpened] = useState(false)
  const [selectedWidget, setSelectedWidget] = useState<WidgetModel | null>(null)
  const { data: widgets, isFetching } = getWidgetsQuery()

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
        {isFetching ? (
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
        ) : !widgets.length ? (
          <EmptyStateLayout
            title="Commencer par ajouter un widget"
            description="The providers are the heart of Metrikube, they allow you to visualize your metrics according to the different plugins."
            onActionButtonClick={openProviderModalHandler}
            buttonLabel="Ajouter un widget"
            imageAsset={PluginEmptyStateImg}
          />
        ) : (
          <WidgetsLayout
            widgets={widgets}
            onAlertOpenRequest={handleAlertOpenRequest}
            onMetricDeletionRequest={handleMetricDeletionRequest}
          />
        )}

        <SetupPluginProvider>
          <ProviderModal open={openedModal} setOpenModal={setOpenModal} />
        </SetupPluginProvider>

        {selectedWidget && (
          <>
            <WidgetAlertsModal
              open={isWidgetAlertsModalOpen}
              setOpenModal={setIsWidgetAlertsModalOpen}
              widget={selectedWidget}
            />

            <ConfirmDeletionModal
              open={isMetricDeletionModalOpened}
              setOpenModal={setIsMetricDeletionModalOpened}
              widget={selectedWidget}
            />
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
  column-gap: ${(props) => props.theme.spacing(2)};
  align-items: center;
  justify-content: center;
`

export default Dashboard
