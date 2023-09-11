
import ListResource from '../molecules/WidgetsGenericTemplates/TableWidget'
import { WidgetModel, formatAsCurrency } from '@metrikube/core'
import { TableCell, TableRow } from '@mui/material'
import React from 'react'

interface Props {
  widget: WidgetModel
}

export const DatabaseSlowQueries = ({ widget }: Props) => {
  return (
    <ListResource
      tableHead={['Requête', "Temps d'éxec (en seconde)", 'Date'].map((column, index) => (
        <TableCell key={index}>{column}</TableCell>
      ))}
      tableBody={widget.data.map((slowQuery, index) => (
        <TableRow key={index}>
          <TableCell>{slowQuery.query}</TableCell>
          <TableCell>{slowQuery.executionTime}</TableCell>
          <TableCell>{slowQuery.date}</TableCell>
        </TableRow>
      ))}
    />
  )
}
