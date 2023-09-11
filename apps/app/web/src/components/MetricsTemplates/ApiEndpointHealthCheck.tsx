import SimpleWidget from '../molecules/WidgetsGenericTemplates/SimpleWidget'
import { WidgetModel } from '@metrikube/core'
import React from 'react'

interface Props {
  widget: WidgetModel
}

export const ApiEndpointHealthCheck = ({ widget }: Props) => {
  return (
    <SimpleWidget>
      <>
        <small>Status : {widget.data.status}</small>
        <small>
          Time : {widget.data.value} {widget.data.unit}
        </small>
      </>
    </SimpleWidget>
  )
}
