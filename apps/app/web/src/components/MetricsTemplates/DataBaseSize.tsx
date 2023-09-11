import SimpleWidget from '../molecules/WidgetsGenericTemplates/SimpleWidget'
import styled from '@emotion/styled'
import { WidgetModel } from '@metrikube/core'
import { List, ListItem, ListItemText } from '@mui/material'
import React from 'react'

interface Props {
  widget: WidgetModel
}

export const DataBaseSize = ({ widget }: Props) => {
  return (
    <SimpleWidget>
      <>
        <List dense={true}>
          <ListItem>
            <StyledItemText primary="Nom de la base : " secondary={widget.data.databaseName} />
          </ListItem>
          <ListItem>
            <StyledItemText primary="Taille : " secondary={widget.data.size + ' Mb'} />
          </ListItem>
          <ListItem>
            <StyledItemText primary="Nombre de table : " secondary={widget.data.numberOfTables} />
          </ListItem>
          <ListItem>
            <StyledItemText
              primary="Nombre total de ligne : "
              secondary={widget.data.numberOfTotalRows}
            />
          </ListItem>
        </List>
      </>
    </SimpleWidget>
  )
}

const StyledItemText = styled(ListItemText)`
  display: flex;

  .MuiListItemText-primary {
    margin-right: 6px;
  }
`
