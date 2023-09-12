import LineChart from '../molecules/WidgetsGenericTemplates/LineChart'
import { WidgetModel } from '@metrikube/core'
import dayjs from 'dayjs'
import React from 'react'

interface Props {
  widget: WidgetModel
}

export const DataBaseQueries = ({ widget }: Props) => {
  const hours = widget.data.queries.map((query) => dayjs(query.hour).format('HH:mm'))
  const nbRequestsPerHour = widget.data.queries.map((query) => query.nbRequests)
  return <LineChart labels={hours} data={nbRequestsPerHour} />
}
