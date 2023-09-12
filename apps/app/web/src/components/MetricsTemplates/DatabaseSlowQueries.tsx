import SqlCodeBlock from '../molecules/SqlCodeBlock'
import ListResource from '../molecules/WidgetsGenericTemplates/TableWidget'
import { WidgetModel } from '@metrikube/core'
import { TableCell, TableRow, Button, Dialog, DialogContent } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'

interface Props {
  widget: WidgetModel
}

export const DatabaseSlowQueries = ({ widget }: Props) => {
  const [isSqlModalOpen, setIsSqlModalOpen] = React.useState(false)
  const [queryToDisplay, setQueryToDisplay] = React.useState('')

  const showSqlModal = (query: string) => {
    setQueryToDisplay(query)
    setIsSqlModalOpen(true)
  }

  return (
    <>
      <ListResource
        tableHead={['Requête', "Temps d'éxec (en seconde)", 'Date'].map((column, index) => (
          <TableCell sx={{ fontWeight: 'bold' }} key={index}>{column}</TableCell>
        ))}
        tableBody={widget.data.map((slowQuery, index) => (
          <TableRow key={index}>
            <TableCell>
              <Button
                variant="outlined"
                disableRipple
                onClick={() => showSqlModal(slowQuery.query)}>
                Voir la requête
              </Button>
            </TableCell>
            <TableCell>{slowQuery.executionTime}</TableCell>
            <TableCell>{dayjs(slowQuery.date).format('D MMM YYYY')}</TableCell>
          </TableRow>
        ))}
      />
      <Dialog open={isSqlModalOpen} onClose={() => setIsSqlModalOpen(false)}>
        <DialogContent>
          <SqlCodeBlock code={queryToDisplay.replace('@', '')} />
        </DialogContent>
      </Dialog>
    </>
  )
}
