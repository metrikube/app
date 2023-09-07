import SimpleWidget from '../molecules/WidgetsGenericTemplates/SimpleWidget'
import { ActiveMetricModel, formatAsCurrency } from '@metrikube/core'
import React from 'react'

interface Props {
  metric: ActiveMetricModel
}

export const AwsBucketSingleInstance = ({ metric }: Props) => {
  return (
    <SimpleWidget>
      <>
        <small>{metric.data.name}</small>
        <small>Région: {metric.data.region}</small>
        <small>{formatAsCurrency(metric.data.cost, metric.data.currency)}</small>
      </>
    </SimpleWidget>
  )
}
