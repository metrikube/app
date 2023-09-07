import { ApiEndpointHealthCheck } from '../../components/MetricsTemplates/ApiEndpointHealthCheck'
import { AwsBucketMultipleInstances } from '../../components/MetricsTemplates/AwsBucketMultipleInstances'
import { AwsBucketSingleInstance } from '../../components/MetricsTemplates/AwsBucketSingleInstance'
import { AwsEc2MultipleInstancesUsage } from '../../components/MetricsTemplates/AwsEc2MultipleInstancesUsage'
import { AwsEc2SingleInstanceUsage } from '../../components/MetricsTemplates/AwsEc2SingleInstanceUsage'
import { DataBaseQueries } from '../../components/MetricsTemplates/DataBaseQueries'
import { DataBaseSize } from '../../components/MetricsTemplates/DataBaseSize'
import { DatabaseSlowQueries } from '../../components/MetricsTemplates/DatabaseSlowQueries'
import { GithubLastIssues } from '../../components/MetricsTemplates/GithubLastIssues'
import { GithubLastPullRequests } from '../../components/MetricsTemplates/GithubLastPullRequests'
import { MetricCard } from './components/MetricCard'
import { MetricTypeEnum } from '@metrikube/common'
import { ActiveMetricModel, WidgetsSize } from '@metrikube/core'
import { Box, Grid } from '@mui/material'
import React from 'react'

interface Props {
  metrics: ActiveMetricModel[]
  onAlertOpenRequest: (metric: ActiveMetricModel) => void
  onMetricDeletionRequest: (metric: ActiveMetricModel) => void
}

export const MetricsLayout = ({ metrics, onAlertOpenRequest, onMetricDeletionRequest }: Props) => {
  const metricTemplateMap: {
    [key: string]: ({ metric }: { metric: ActiveMetricModel }) => JSX.Element
  } = {
    [MetricTypeEnum.ApiEndpointHealthCheck]: ApiEndpointHealthCheck,
    [MetricTypeEnum.AwsBucketSingleInstance]: AwsBucketSingleInstance,
    [MetricTypeEnum.AwsBucketMultipleInstances]: AwsBucketMultipleInstances,
    [MetricTypeEnum.AwsEc2SingleInstanceUsage]: AwsEc2SingleInstanceUsage,
    [MetricTypeEnum.AwsEc2MultipleInstancesUsage]: AwsEc2MultipleInstancesUsage,
    [MetricTypeEnum.GithubLastIssues]: GithubLastIssues,
    [MetricTypeEnum.GithubLastPrs]: GithubLastPullRequests,
    [MetricTypeEnum.DatabaseQueries]: DataBaseQueries,
    [MetricTypeEnum.DatabaseSlowQueries]: DatabaseSlowQueries,
    [MetricTypeEnum.DatabaseSize]: DataBaseSize
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {metrics.map((metric) => {
          return (
            <MetricCard
              metric={metric}
              key={metric.id}
              size={WidgetsSize[metric.metric.type]}
              onAlertButtonClick={() => onAlertOpenRequest(metric)}
              onDeleteButtonClick={() => onMetricDeletionRequest(metric)}>
              {metricTemplateMap[metric.metric.type]({ metric })}
            </MetricCard>
          )
        })}
      </Grid>
    </Box>
  )
}
