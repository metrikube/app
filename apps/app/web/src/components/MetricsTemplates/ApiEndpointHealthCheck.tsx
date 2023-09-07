import SimpleWidget from '../molecules/WidgetsGenericTemplates/SimpleWidget'
import { ActiveMetricModel } from '@metrikube/core'
import React from 'react'

interface Props {
  metric: ActiveMetricModel
}

export const ApiEndpointHealthCheck = ({ metric }: Props) => {
  return (
    <SimpleWidget>
      <>
        <small>Status : {metric.data.status}</small>
        <small>
          Time : {metric.data.value} {metric.data.unit}
        </small>
      </>
    </SimpleWidget>
  )
}
