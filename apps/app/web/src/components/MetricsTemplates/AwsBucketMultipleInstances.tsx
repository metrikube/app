import ListResource from '../molecules/WidgetsGenericTemplates/TableWidget'
import { WidgetModel, formatAsCurrency } from '@metrikube/core'
import { TableCell, TableRow } from '@mui/material'
import React from 'react'

interface Props {
  widget: WidgetModel
}

export const AwsBucketMultipleInstances = ({ widget }: Props) => {
  return (
    <ListResource
      tableHead={['Nom du bucket', 'Coût'].map((column, index) => (
        <TableCell sx={{ fontWeight: 'bold' }} key={index}>{column}</TableCell>
      ))}
      tableBody={widget.data.map((instance: any) => (
        <TableRow key={instance.id}>
          <TableCell>{instance.name}</TableCell>
          <TableCell>{formatAsCurrency(instance.cost, instance.currency)}</TableCell>
        </TableRow>
      ))}
    />
  )
}
