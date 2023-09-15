import { TitledBox } from '../molecules/TitledBox'
import SimpleWidget from '../molecules/WidgetsGenericTemplates/SimpleWidget'
import styled from '@emotion/styled'
import { WidgetModel, formatAsCurrency } from '@metrikube/core'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'
import StraightenIcon from '@mui/icons-material/Straighten'
import { List, ListItem, ListItemText, Box, Typography } from '@mui/material'
import React from 'react'

interface Props {
  widget: WidgetModel
}

export const AwsBucketSingleInstance = ({ widget }: Props) => {
  const getColorForStatus = (status: string) => {
    switch (status) {
      case 'Stopped':
        return '#cc6363' // 1xx Informational responses
      case 'Running':
        return '#83b17f' // 2xx Success
      case 'Stopping':
        return '#d6926e' // 4xx Client errors
      default:
        return 'gray' // Other
    }
  }

  const getTranslationForStatus = (status: string) => {
    switch (status) {
      case 'Stopped':
        return 'Arrêtée'
      case 'Running':
        return 'En cours'
      case 'Stopping':
        return 'Arrêt en cours'
      default:
        return 'Autre'
    }
  }

  return (
    <SimpleWidget>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '60px'
        }}>
        <Typography sx={{ color: '#696969', fontSize: '18px', fontWeight: 'bold' }}>
          {widget.data.name}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', columnGap: '70px' }}>
        <TitledBox title="Coût" icon={AttachMoneyIcon} iconColor="#e2c36f">
          <Typography
            sx={{
              fontSize: '30px',
              fontWeight: 'bold'
            }}>
            {formatAsCurrency(widget.data.cost, widget.data.currency)}
          </Typography>
        </TitledBox>
        <TitledBox title="Statut" icon={MonitorHeartIcon} iconColor="#50D768">
          <Typography
            sx={{
              fontSize: '20px',
              lineHeight: '1',
              color: getColorForStatus(widget.data.status),
              fontWeight: 'bold'
            }}>
            {getTranslationForStatus(widget.data.status)}
          </Typography>
        </TitledBox>
        <TitledBox title="Région" icon={LocationOnIcon} iconColor="#4160b4">
          <Typography
            sx={{
              fontSize: '20px',
              lineHeight: '1'
            }}>
            {widget.data.region}
          </Typography>
        </TitledBox>
      </Box>

      {/* 
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
      </List> */}
    </SimpleWidget>
  )
}

const StyledItemText = styled(ListItemText)`
  display: flex;

  .MuiListItemText-primary {
    margin-right: 6px;
  }
`
