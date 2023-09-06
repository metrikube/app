import SimpleWidget from '../molecules/WidgetsGenericTemplates/SimpleWidget'
import { ActiveMetricModel } from '@metrikube/core'
import React from 'react'

interface Props {
  metric: ActiveMetricModel
}

export const DataBaseSize = ({ metric }: Props) => {
  return (
    <SimpleWidget>
      <>
        <small>{metric.data.databaseName}</small>
        <small>Taille : {metric.data.size} Mb</small>
        <small>Nombre de table : {metric.data.numberOfTables}</small>
        <small>Nombre total de ligne : {metric.data.numberOfTotalRows}</small>
      </>
    </SimpleWidget>
  )
}