import { TableContainer, Table, TableBody, TableHead, TableRow } from '@mui/material'
import React from 'react'

type Props = {
  tableHead: JSX.Element
  tableBody: JSX.Element
}

const ListResource = ({ tableHead, tableBody }: Props) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>{tableHead}</TableRow>
        </TableHead>
        <TableBody>{tableBody}</TableBody>
      </Table>
    </TableContainer>
  )
}

export default ListResource
