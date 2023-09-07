import SimpleWidget from '../molecules/WidgetsGenericTemplates/SimpleWidget'
import { ActiveMetricModel, formatAsCurrency } from '@metrikube/core'
import React from 'react'

interface Props {
  metric: ActiveMetricModel
}

export const AwsEc2MultipleInstancesUsage = ({ metric }: Props) => {
  return (
    <SimpleWidget>
      <>
        <small>{metric.data.name}</small>
      </>
    </SimpleWidget>
  )
}
