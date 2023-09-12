import SimpleWidget from '../molecules/WidgetsGenericTemplates/SimpleWidget'
import styled from '@emotion/styled'
import { WidgetModel } from '@metrikube/core'
import { List, ListItem, ListItemText } from '@mui/material'
import React from 'react'

interface Props {
  widget: WidgetModel
}

export const ApiEndpointHealthCheck = ({ widget }: Props) => {
  const getColorForStatus = (statusCode: number | boolean | undefined) => {
    if (typeof statusCode !== 'number') return 'gray'
    switch (Math.floor(statusCode / 100)) {
      case 1:
        return 'lightblue' // 1xx Informational responses
      case 2:
        return 'green' // 2xx Success
      case 3:
        return 'blue' // 3xx Redirection
      case 4:
        return 'orange' // 4xx Client errors
      case 5:
        return 'red' // 5xx Server errors
      default:
        return 'gray' // Other
    }
  }

  return (
    <SimpleWidget>
      <>
        <List dense={true}>
          <ListItem>
            <StyledItemText
              primary="Statut :"
              secondary={widget.data.status}
              secondaryTypographyProps={{
                sx: { color: getColorForStatus(widget.data.status), display: 'inline' }
              }}
            />
          </ListItem>
          <ListItem>
            <StyledItemText
              primary="Temps de réponse : "
              secondary={`${widget.data.value} ${widget.data.unit}`}
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
