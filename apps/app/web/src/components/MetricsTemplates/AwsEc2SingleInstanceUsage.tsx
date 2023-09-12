import SimpleWidget from '../molecules/WidgetsGenericTemplates/SimpleWidget'
import { WidgetModel, formatAsCurrency } from '@metrikube/core'
import React from 'react'

interface Props {
  widget: WidgetModel
}

export const AwsEc2SingleInstanceUsage = ({ widget }: Props) => {
  return (
    <SimpleWidget>
      <>
        <small>{widget.data.name}</small>
        <small>Région: {widget.data.region}</small>
        <small>{formatAsCurrency(widget.data.cost, widget.data.currency)}</small>
      </>
    </SimpleWidget>
  )
}
