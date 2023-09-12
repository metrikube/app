import SimpleWidget from '../molecules/WidgetsGenericTemplates/SimpleWidget'
import styled from '@emotion/styled'
import { WidgetModel, formatAsCurrency } from '@metrikube/core'
import { List, ListItem, ListItemText } from '@mui/material'
import React from 'react'

interface Props {
  widget: WidgetModel
}

export const AwsBucketSingleInstance = ({ widget }: Props) => {
  return (
    <SimpleWidget>
      <List dense={true}>
        <ListItem>
          <StyledItemText primary="Nom de l'instance : " secondary={widget.data.name} />
        </ListItem>
        <ListItem>
          <StyledItemText primary="Région : " secondary={widget.data.region} />
        </ListItem>
        <ListItem>
          <StyledItemText
            primary="Coût : "
            secondary={formatAsCurrency(widget.data.cost, widget.data.currency)}
          />
        </ListItem>
      </List>
    </SimpleWidget>
  )
}

const StyledItemText = styled(ListItemText)`
  display: flex;

  .MuiListItemText-primary {
    margin-right: 6px;
  }
`
