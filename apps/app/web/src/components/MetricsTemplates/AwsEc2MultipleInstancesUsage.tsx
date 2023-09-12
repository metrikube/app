import SimpleWidget from '../molecules/WidgetsGenericTemplates/SimpleWidget'
import { WidgetModel, formatAsCurrency } from '@metrikube/core'
import React from 'react'

interface Props {
  widget: WidgetModel
}

export const AwsEc2MultipleInstancesUsage = ({ widget }: Props) => {
  return (
    <SimpleWidget>
      <>
        <small>{widget.data.name}</small>
      </>
    </SimpleWidget>
  )
}
