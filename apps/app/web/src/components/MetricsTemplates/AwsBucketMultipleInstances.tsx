import ListResource from '../molecules/WidgetsGenericTemplates/TableWidget'
import { ActiveMetricModel, formatAsCurrency } from '@metrikube/core'
import { TableCell, TableRow } from '@mui/material'
import React from 'react'

interface Props {
  metric: ActiveMetricModel
}

export const AwsBucketMultipleInstances = ({ metric }: Props) => {
  return (
    <ListResource
      tableHead={['Nom du bucket', 'Coût'].map((column, index) => (
        <TableCell key={index}>{column}</TableCell>
      ))}
      tableBody={metric.data.map((instance: any) => (
        <TableRow key={instance.id}>
          <TableCell>{instance.name}</TableCell>
          <TableCell>{formatAsCurrency(instance.cost, instance.currency)}</TableCell>
        </TableRow>
      ))}
    />
  )
}
