import ApiMetricBody from '../../components/molecules/metricCards/metricsTypes/api/ApiMetricBody'
import SingleInstanceEC2 from '../../components/molecules/metricCards/metricsTypes/aws/SingleInstanceEC2'
import LastPullRequest from '../../components/molecules/metricCards/metricsTypes/github/LastPullRequest'
import { MetricCard } from './components/MetricCard'
import { ActiveMetricModel } from '@metrikube/core'
import { Box, Grid } from '@mui/material'
import React from 'react'

interface Props {
  metrics: ActiveMetricModel[]
  onAlertOpenRequest: (metric: ActiveMetricModel) => void
  onMetricDeletionRequest: (metric: ActiveMetricModel) => void
}

export const MetricsLayout = ({ metrics, onAlertOpenRequest, onMetricDeletionRequest }: Props) => {
  const getMetricCardContent = ({ metric, data }: ActiveMetricModel) => {
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {metrics.map((metric, index) => (
          <MetricCard
            metric={metric}
            key={metric.id}
            size={index % 2 ? 'small' : 'large'}
            onAlertButtonClick={() => onAlertOpenRequest(metric)}
            onDeleteButtonClick={() => onMetricDeletionRequest(metric)}>
            {getMetricCardContent(metric)}
          </MetricCard>
        ))}
      </Grid>
    </Box>
  )
}
