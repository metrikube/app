import PluginEmptyStateImg from '../assets/img/undraws/undraw_online_stats.svg'
import BaseMetricCard from '../components/molecules/metricCards/BaseMetricCard'
import ApiMetricBody from '../components/molecules/metricCards/metricsTypes/api/ApiMetricBody'
import SingleInstanceEC2 from '../components/molecules/metricCards/metricsTypes/aws/SingleInstanceEC2'
import LastPullRequest from '../components/molecules/metricCards/metricsTypes/github/LastPullRequest'
import ProviderModal from '../components/organisms/modals/Provider.modal'
import { useAdapter } from '../config/axios'
import { SetupPluginProvider } from '../contexts/SetupPlugin.context'
import DefaultLayout from '../layouts/DefaultLayout'
import { EmptyStateLayout } from '../layouts/EmptyStateLayout'
import styled from '@emotion/styled'
import { Metric } from '@metrikube/common'
import { GetActiveMetricsUsecase } from '@metrikube/core'
import { AddCircleOutline, AddchartOutlined } from '@mui/icons-material'
import { Button, Grid } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

const Dashboard = () => {
  const [openedModal, setOpenModal] = useState(false)
  const { dashboardMetricsAdapter } = useAdapter()
  const openProviderModalHandler = () => {
    setOpenModal(true)
  }

  const { data: activeMetrics } = useQuery({
    queryKey: ['getActiveMetrics'],
    queryFn: () => new GetActiveMetricsUsecase(dashboardMetricsAdapter).execute(),
    initialData: () => []
  })

  const MetricsContent = (metric: Metric, data: unknown) => {
    switch (metric.type) {
      case 'api-endpoint-health-check':
        return <ApiMetricBody status={data.status} unit={data.unit} value={data.value} />
      case 'aws-bucket-single-instance':
        return <SingleInstanceEC2 />
      case 'github-last-prs':
        return <LastPullRequest />
    }
  }

  return (
    <DefaultLayout>
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

      {activeMetrics.length ? (
        <Grid container>
          {activeMetrics.map((metric) => (
            <BaseMetricCard
              metricId={metric.metric.id}
              title={`${metric.plugin.name} - ${metric.metric.name}`}
              isNotificationActivated={metric.metric.isNotifiable}
              key={metric.metric.id}>
              {MetricsContent(metric.metric, metric.data)}
            </BaseMetricCard>
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
    </DefaultLayout>
  )
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default Dashboard
