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
import MasonryGrid from '../../components/organisms/Masonry'
import { WidgetCard } from './components/WidgetCard'
import { MetricTypeEnum } from '@metrikube/common'
import { WidgetModel, WidgetsSize } from '@metrikube/core'
import { Box } from '@mui/material'
import React from 'react'

interface Props {
  widgets: WidgetModel[]
  onAlertOpenRequest: (metric: WidgetModel) => void
  onMetricDeletionRequest: (metric: WidgetModel) => void
}

export const WidgetsLayout = ({ widgets, onAlertOpenRequest, onMetricDeletionRequest }: Props) => {
  const widgetTemplateMap: {
    [key: string]: ({ widget }: { widget: WidgetModel }) => JSX.Element
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
      <MasonryGrid>
        {widgets.map((widget) => {
          return (
            <article
              className={`grid-item ${WidgetsSize[widget.metric.type] === 'large' ? 'grid-item--large' : ''
                }`}
              key={widget.id}>
              <WidgetCard
                widget={widget}
                key={widget.id}
                size={WidgetsSize[widget.metric.type]}
                onAlertButtonClick={() => onAlertOpenRequest(widget)}
                onDeleteButtonClick={() => onMetricDeletionRequest(widget)}>
                {widgetTemplateMap[widget.metric.type]({ widget })}
              </WidgetCard>
            </article>
          )
        })}
      </MasonryGrid>
    </Box>
  )
}
