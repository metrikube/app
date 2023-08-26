import PluginEmptyStateImg from '../assets/img/undraws/undraw_online_stats.svg'
import BaseMetricCard from '../components/molecules/metricCards/BaseMetricCard'
import ApiMetricBody from '../components/molecules/metricCards/metricsTypes/api/ApiMetricBody'
import SingleInstanceEC2 from '../components/molecules/metricCards/metricsTypes/aws/SingleInstanceEC2'
import LastPullRequest from '../components/molecules/metricCards/metricsTypes/github/LastPullRequest'
import ConfirmDeletionModal from '../components/organisms/modals/ConfirmDeletion.modal'
import MetricAlertsModal from '../components/organisms/modals/MetricAlerts.modal'
import ProviderModal from '../components/organisms/modals/Provider.modal'
import { useAdapter } from '../config/axios'
import { DashboardProvider } from '../contexts/Dashboard.context'
import { SetupPluginProvider } from '../contexts/SetupPlugin.context'
import DefaultLayout from '../layouts/DefaultLayout'
import { EmptyStateLayout } from '../layouts/EmptyStateLayout'
import styled from '@emotion/styled'
import { ActiveMetricModel, GetActiveMetricsUsecase, activeMetricsMock } from '@metrikube/core'
import { AddCircleOutline, AddchartOutlined } from '@mui/icons-material'
import { Button, Grid } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

const Dashboard = () => {
  const { dashboardMetricsAdapter } = useAdapter()
  const { data: activeMetrics } = useQuery<ActiveMetricModel[]>({
    queryKey: ['getActiveMetrics'],
    queryFn: () => new GetActiveMetricsUsecase(dashboardMetricsAdapter).execute(),
    initialData: () => []
  })

  const [openedModal, setOpenModal] = useState(false)
  const [isMetricAlertsModalOpened, setIsMetricAlertsModalOpened] = useState(false)
  const [isMetricDeletionModalOpened, setIsMetricDeletionModalOpened] = useState(false)


  const openProviderModalHandler = () => {
    setOpenModal(true)
  }
  const MetricsContent = ({ metric, data }: ActiveMetricModel) => {
    switch (metric.type) {
      case 'api-endpoint-health-check':
        return <ApiMetricBody status={data.status} unit={data.unit} value={data.value} />
      case 'aws-bucket-single-instance':
        return <SingleInstanceEC2 name={data.name} status={data.status} cost={data.cost} />
      case 'aws-ec2-single-instance-usage':
        return <SingleInstanceEC2 name={data.name} status={data.status} cost={data.cost} />
      case 'github-last-prs':
        return <LastPullRequest />
      case 'github-last-issues':
        return <p>test</p>
    }
  }

  const metricsTemp: ActiveMetricModel[] = [...activeMetrics, ...activeMetricsMock]

  return (
    <DefaultLayout>
      <DashboardProvider>
        <>
          <StyledHeader>
            <h3>NOM DU PROJET</h3>
            <div>
              <Button
                onClick={openProviderModalHandler}
                size="medium"
                variant="contained"
                startIcon={<AddCircleOutline />}>
                Add a new provider
              </Button>
              <Button sx={{ ml: 1 }} size="medium" variant="contained" startIcon={<AddchartOutlined />}>
                Add a new widget
              </Button>
            </div>
          </StyledHeader>

          {metricsTemp.length ? (
            <Grid container spacing={3}>
              {metricsTemp.map((activeMetric) => (
                <Grid item key={activeMetric.metric.id}>
                  <BaseMetricCard
                    activeMetric={activeMetric}
                    setIsMetricAlertsModalOpened={setIsMetricAlertsModalOpened}
                    setIsMetricDeletionModalOpened={setIsMetricDeletionModalOpened}
                    key={activeMetric.metric.id}>
                    {MetricsContent(activeMetric)}
                  </BaseMetricCard>
                </Grid>
              ))}
            </Grid>
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

          <MetricAlertsModal
            open={isMetricAlertsModalOpened}
            setOpenModal={setIsMetricAlertsModalOpened}
          />

          <ConfirmDeletionModal
            open={isMetricDeletionModalOpened}
            setOpenModal={setIsMetricDeletionModalOpened}
          />
        </>
      </DashboardProvider>
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
