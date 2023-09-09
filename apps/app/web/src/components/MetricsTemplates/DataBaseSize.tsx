import SimpleWidget from '../molecules/WidgetsGenericTemplates/SimpleWidget'
import { WidgetModel } from '@metrikube/core'
import React from 'react'

interface Props {
  widget: WidgetModel
}

export const DataBaseSize = ({ widget }: Props) => {
  return (
    <SimpleWidget>
      <>
        <small>{widget.data.databaseName}</small>
        <small>Taille : {widget.data.size} Mb</small>
        <small>Nombre de table : {widget.data.numberOfTables}</small>
        <small>Nombre total de ligne : {widget.data.numberOfTotalRows}</small>
      </>
    </SimpleWidget>
  )
}
