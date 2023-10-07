import ListResource from '../molecules/WidgetsGenericTemplates/TableWidget'
import { ApiAWSSingleResourceInstanceResult } from '@metrikube/common'
import { WidgetModel, formatAsCurrency } from '@metrikube/core'
import { TableCell, TableRow } from '@mui/material'
import React from 'react'

interface Props {
  widget: WidgetModel
}

export const AwsEc2MultipleInstancesUsage = ({ widget }: Props) => {
  const data = widget.data as ApiAWSSingleResourceInstanceResult[]
  return (
    <ListResource
      tableHead={['Nom du bucket', 'Région', 'Coût'].map((column, index) => (
        <TableCell sx={{ fontWeight: 'bold' }} key={index}>
          {column}
        </TableCell>
      ))}
      tableBody={data.map((instance: ApiAWSSingleResourceInstanceResult) => (
        <TableRow key={instance.id}>
          <TableCell>{instance.name}</TableCell>
          <TableCell>{instance.region}</TableCell>
          {instance?.cost && instance?.currency && (
            <TableCell>
              {formatAsCurrency(parseInt(instance.cost as string, 10), instance.currency)}
            </TableCell>
          )}
        </TableRow>
      ))}
    />
  )
}
