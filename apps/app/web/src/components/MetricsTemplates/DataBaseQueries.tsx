import SimpleWidget from '../molecules/WidgetsGenericTemplates/SimpleWidget'
import { ActiveMetricModel } from '@metrikube/core'
import React from 'react'

interface Props {
  metric: ActiveMetricModel
}

export const DataBaseQueries = ({ metric }: Props) => {
  return (
    <SimpleWidget>
      <>
        <small>{metric.data.name}</small>
      </>
    </SimpleWidget>
  )
}
