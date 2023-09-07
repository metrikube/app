import PluginEmptyStateImg from '../assets/img/undraws/undraw_online_stats.svg'
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
import { AddCircleOutline, AddchartOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'
import React, { useState } from 'react'

const Dashboard = () => {
  const [openedModal, setOpenModal] = useState(false)
  const [isMetricAlertsModalOpen, setIsMetricAlertsModalOpen] = useState(false)
  const [isMetricDeletionModalOpened, setIsMetricDeletionModalOpened] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState<ActiveMetricModel | null>(null)
  const { data: activeMetrics } = getActiveMetricQuery()

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
      <>
        <StyledHeader>
          <h3>Metric</h3>
          <div>
            <Button
              onClick={openProviderModalHandler}
              size="medium"
              variant="contained"
              startIcon={<AddCircleOutline />}>
              Add a new provider
            </Button>
            <Button
              sx={{ ml: 1 }}
              size="medium"
              variant="contained"
              startIcon={<AddchartOutlined />}>
              Add a new widget
            </Button>
          </div>
        </StyledHeader>

        {activeMetricsMock.length ? (
          <MetricsLayout
            metrics={activeMetricsMock}
            onAlertOpenRequest={handleAlertOpenRequest}
            onMetricDeletionRequest={handleMetricDeletionRequest}
          />
        ) : (
          <EmptyStateLayout
            title="Get started by adding a provider"
            description="The providers are the heart of Metrikube, they allow you to visualize your metrics according to the different plugins."
            onActionButtonClick={openProviderModalHandler}
            buttonLabel="Add a new provider"
            imageAsset={PluginEmptyStateImg}
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
      </>
    </DefaultLayout>
  )
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`

export default Dashboard
