import LineChart from '../../components/molecules/widgets/LineChart'
import ListResource from '../../components/molecules/widgets/ListResource'
import SingleResource from '../../components/molecules/widgets/SingleResource'
import { MetricCard } from './components/MetricCard'
import { ActiveMetricModel, formatAsCurrency } from '@metrikube/core'
import { Box, Grid, TableCell, TableRow } from '@mui/material'
import React from 'react'

interface Props {
  metrics: ActiveMetricModel[]
  onAlertOpenRequest: (metric: ActiveMetricModel) => void
  onMetricDeletionRequest: (metric: ActiveMetricModel) => void
}

export const MetricsLayout = ({ metrics, onAlertOpenRequest, onMetricDeletionRequest }: Props) => {
  const getMetricCardContent = ({ metric, data }: ActiveMetricModel) => {
    switch (metric.type) {
      case 'api-endpoint-health-check':
        return (
          <SingleResource>
            <>
              <small>Status : {data.status}</small>
              <small>
                Time : {data.value} {data.unit}
              </small>
            </>
          </SingleResource>
        )
      case 'aws-bucket-single-instance':
        return (
          <SingleResource>
            <>
              <small>{data.name}</small>
              <small>Région: {data.region}</small>
              <small>{formatAsCurrency(data.cost, data.currency)}</small>
            </>
          </SingleResource>
        )
      case 'aws-ec2-single-instance-usage':
        return (
          <SingleResource>
            <>
              <small>{data.name}</small>
              <small>Région: {data.region}</small>
              <small>{formatAsCurrency(data.cost, data.currency)}</small>
            </>
          </SingleResource>
        )
      case 'aws-bucket-multiple-instances':
        return (
          <ListResource
            tableHead={['Nom du bucket', 'Coût'].map((column, index) => (
              <TableCell key={index}>{column}</TableCell>
            ))}
            tableBody={data.map((instance) => (
              <TableRow key={instance.id}>
                <TableCell>{instance.name}</TableCell>
                <TableCell>{formatAsCurrency(instance.cost, instance.currency)}</TableCell>
              </TableRow>
            ))}
          />
        )
      case 'github-last-issues':
        return (
          <ListResource
            tableHead={['Numéro', 'Titre', 'Auteur', 'status'].map((column, index) => (
              <TableCell key={index}>{column}</TableCell>
            ))}
            tableBody={data.map((issue, index) => (
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
      case 'github-last-prs':
        return (
          <ListResource
            tableHead={['Numéro', 'Titre', 'Auteur', 'status'].map((column, index) => (
              <TableCell key={index}>{column}</TableCell>
            ))}
            tableBody={data.map((pullRequest, index) => (
              <TableRow key={index}>
                <TableCell>
                  <a href={pullRequest.url} target="_blank" rel="noreferrer">
                    {pullRequest.number}
                  </a>
                </TableCell>
                <TableCell>{pullRequest.title}</TableCell>
                <TableCell>{pullRequest.author}</TableCell>
                <TableCell>{pullRequest.status}</TableCell>
              </TableRow>
            ))}
          />
        )
      case 'database-queries':
        return <LineChart />
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {metrics.map((metric, index) => (
          <MetricCard
            metric={metric}
            key={metric.id}
            size={index % 2 ? 'small' : 'large'}
            onAlertButtonClick={() => onAlertOpenRequest(metric)}
            onDeleteButtonClick={() => onMetricDeletionRequest(metric)}>
            {getMetricCardContent(metric)}
          </MetricCard>
        ))}
      </Grid>
    </Box>
  )
}
