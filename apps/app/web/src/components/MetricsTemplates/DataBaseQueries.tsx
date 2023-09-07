import LineChart from '../molecules/WidgetsGenericTemplates/LineChart'
import { ActiveMetricModel } from '@metrikube/core'
import dayjs from 'dayjs'
import React from 'react'

interface Props {
  metric: ActiveMetricModel
}

export const DataBaseQueries = ({ metric }: Props) => {
  const hours = metric.data.queries.map((query) => dayjs(query.hour).format('HH:mm'))
  const nbRequestsPerHour = metric.data.queries.map((query) => query.nbRequests)
  return <LineChart labels={hours} data={nbRequestsPerHour} />
}
