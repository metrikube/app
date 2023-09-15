import { TitledBox } from '../molecules/TitledBox'
import SimpleWidget from '../molecules/WidgetsGenericTemplates/SimpleWidget'
import styled from '@emotion/styled'
import { WidgetModel } from '@metrikube/core'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'
import SpeedIcon from '@mui/icons-material/Speed'
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'

interface Props {
  widget: WidgetModel
}

export const ApiEndpointHealthCheck = ({ widget }: Props) => {
  const getColorForStatus = (statusCode: number | boolean | undefined) => {
    if (typeof statusCode !== 'number') return 'gray'
    switch (Math.floor(statusCode / 100)) {
      case 1:
        return '#9ac9c6' // 1xx Informational responses
      case 2:
        return '#83b17f' // 2xx Success
      case 3:
        return '#5e7fbd' // 3xx Redirection
      case 4:
        return '#d6926e' // 4xx Client errors
      case 5:
        return '#cc6363' // 5xx Server errors
      default:
        return 'gray' // Other
    }
  }

  return (
    <SimpleWidget>
      <Box sx={{ display: 'flex', columnGap: '70px' }}>
        <TitledBox title="Statut" icon={MonitorHeartIcon} iconColor="#4160b4">
          <Typography
            sx={{
              color: getColorForStatus(widget.data.status),
              fontSize: '30px',
              fontWeight: 'bold'
            }}>
            {widget.data.status}
          </Typography>
        </TitledBox>
        <TitledBox title="Temps de réponse" icon={SpeedIcon} iconColor="#50D768">
          <Typography
            sx={{
              fontSize: '20px',
              lineHeight: '1'
            }}>
            {`${widget.data.value} ${widget.data.unit}`}
          </Typography>
        </TitledBox>
      </Box>
    </SimpleWidget>
  )
}

const StyledItemText = styled(ListItemText)`
  display: flex;

  .MuiListItemText-primary {
    margin-right: 6px;
  }
`
