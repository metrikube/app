import ListResource from '../molecules/WidgetsGenericTemplates/TableWidget'
import { ActiveMetricModel } from '@metrikube/core'
import { TableCell, TableRow, Chip } from '@mui/material'
import React from 'react'

interface Props {
  metric: ActiveMetricModel
}

export const GithubLastPullRequests = ({ metric }: Props) => {
  return (
    <ListResource
      tableHead={['Numéro', 'Titre', 'Auteur', 'status'].map((column, index) => (
        <TableCell key={index}>{column}</TableCell>
      ))}
      tableBody={metric.data.map((issue, index) => (
        <TableRow key={index}>
          <TableCell>
            <a href={issue.url} target="_blank" rel="noreferrer">
              {issue.number}
            </a>
          </TableCell>
          <TableCell>{issue.title}</TableCell>
          <TableCell>{issue.author}</TableCell>
          <TableCell>
            <Chip
              label={issue.status}
              size="small"
              color={issue.status === 'closed' ? 'primary' : 'success'}
            />
          </TableCell>
        </TableRow>
      ))}
    />
  )
}
