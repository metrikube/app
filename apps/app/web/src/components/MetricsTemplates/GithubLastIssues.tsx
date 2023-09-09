import ListResource from '../molecules/WidgetsGenericTemplates/TableWidget'
import { WidgetModel } from '@metrikube/core'
import { TableCell, TableRow } from '@mui/material'
import React from 'react'

interface Props {
  widget: WidgetModel
}

export const GithubLastIssues = ({ widget }: Props) => {
  return (
    <ListResource
      tableHead={['Numéro', 'Titre', 'Auteur', 'status'].map((column, index) => (
        <TableCell key={index}>{column}</TableCell>
      ))}
      tableBody={widget.data.map((issue, index) => (
        <TableRow key={index}>
          <TableCell>
            <a href={issue.url} target="_blank" rel="noreferrer">
              {issue.number}
            </a>
          </TableCell>
          <TableCell>{issue.title}</TableCell>
          <TableCell>{issue.author}</TableCell>
          <TableCell>{issue.status}</TableCell>
        </TableRow>
      ))}
    />
  )
}
