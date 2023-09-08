import PluginEmptyStateImg from '../assets/img/undraws/undraw_online_stats.svg'
import Loader from '../components/atoms/Loader'
import ConfirmDeletionModal from '../components/organisms/modals/ConfirmDeletion.modal'
import MetricAlertsModal from '../components/organisms/modals/MetricAlerts.modal'
import ProviderModal from '../components/organisms/modals/Provider.modal'
import { SetupPluginProvider } from '../contexts/SetupPlugin.context'
import DefaultLayout from '../layouts/DefaultLayout'
import { EmptyStateLayout } from '../layouts/EmptyStateLayout'
import { MetricsLayout } from '../layouts/MetricsLayout'
import { getActiveMetricQuery } from '../services/dashboard.service'
import styled from '@emotion/styled'
import { ActiveMetricModel, activeMetricsMock } from '@metrikube/core'
import { AddchartOutlined } from '@mui/icons-material'
import { Button, Box, Typography } from '@mui/material'
import MetrikubeLogo from 'apps/app/web/src/assets/img/metrikube-logo.png'
import React, { useState } from 'react'

const Dashboard = () => {
  const [openedModal, setOpenModal] = useState(false)
  const [isMetricAlertsModalOpen, setIsMetricAlertsModalOpen] = useState(false)
  const [isMetricDeletionModalOpened, setIsMetricDeletionModalOpened] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState<ActiveMetricModel | null>(null)
  const { data: activeMetrics, isFetching } = getActiveMetricQuery()

  const openProviderModalHandler = () => {
    setOpenModal(true)
  }

  const handleAlertOpenRequest = (metric: ActiveMetricModel) => {
    setSelectedMetric(metric)
    setIsMetricAlertsModalOpen(true)
  }

  const handleMetricDeletionRequest = (metric: ActiveMetricModel) => {
    setSelectedMetric(metric)
    setIsMetricDeletionModalOpened(true)
  }

  return (
    <DefaultLayout>
      <StyledHeader>
        <Brand>
          <img src={MetrikubeLogo} style={{ height: '50px' }} />
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
            Add a new widget
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
        ) : !activeMetrics.length ? (
          <EmptyStateLayout
            title="Commencer par ajouter un widget"
            description="The providers are the heart of Metrikube, they allow you to visualize your metrics according to the different plugins."
            onActionButtonClick={openProviderModalHandler}
            buttonLabel="Ajouter un widget"
            imageAsset={PluginEmptyStateImg}
          />
        ) : (
          <MetricsLayout
            metrics={activeMetrics}
            onAlertOpenRequest={handleAlertOpenRequest}
            onMetricDeletionRequest={handleMetricDeletionRequest}
          />
        )}

        <SetupPluginProvider>
          <ProviderModal open={openedModal} setOpenModal={setOpenModal} />
        </SetupPluginProvider>

        {selectedMetric && (
          <>
            <MetricAlertsModal
              open={isMetricAlertsModalOpen}
              setOpenModal={setIsMetricAlertsModalOpen}
              metric={selectedMetric}
            />

            <ConfirmDeletionModal
              open={isMetricDeletionModalOpened}
              setOpenModal={setIsMetricDeletionModalOpened}
              metric={selectedMetric}
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
