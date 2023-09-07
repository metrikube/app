
import ListResource from '../molecules/WidgetsGenericTemplates/TableWidget'
import { ActiveMetricModel, formatAsCurrency } from '@metrikube/core'
import { TableCell, TableRow } from '@mui/material'
import React from 'react'

interface Props {
  metric: ActiveMetricModel
}

export const DatabaseSlowQueries = ({ metric }: Props) => {
  return (
    <ListResource
      tableHead={['Requête', "Temps d'éxec (en seconde)", 'Date'].map((column, index) => (
        <TableCell key={index}>{column}</TableCell>
      ))}
      tableBody={metric.data.map((slowQuery, index) => (
        <TableRow key={index}>
          <TableCell>{slowQuery.query}</TableCell>
          <TableCell>{slowQuery.executionTime}</TableCell>
          <TableCell>{slowQuery.date}</TableCell>
        </TableRow>
      ))}
    />
  )
}
