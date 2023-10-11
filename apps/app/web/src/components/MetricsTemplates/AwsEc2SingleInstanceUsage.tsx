import { TitledBox } from '../molecules/TitledBox'
import SimpleWidget from '../molecules/WidgetsGenericTemplates/SimpleWidget'
import { ApiAWSSingleResourceInstanceResult } from '@metrikube/common'
import { WidgetModel, formatAsCurrency } from '@metrikube/core'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'
import { Box, Typography } from '@mui/material'
import React from 'react'

interface Props {
  widget: WidgetModel
}

export const getColorForStatus = (status: string) => {
  switch (status) {
    case 'stopped':
      return '#cc6363' // 1xx Informational responses
    case 'running':
      return '#83b17f' // 2xx Success
    case 'stopping':
      return '#d6926e' // 4xx Client errors
    default:
      return 'gray' // Other
  }
}

export const getTranslationForStatus = (status: string) => {
  switch (status) {
    case 'stopped':
      return 'Arrêtée'
    case 'running':
      return 'En cours'
    case 'stopping':
      return 'Arrêt en cours'
    default:
      return 'Autre'
  }
}

export const AwsEc2SingleInstanceUsage = ({ widget }: Props) => {
  const data = widget.data as ApiAWSSingleResourceInstanceResult
  return (
    <SimpleWidget>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '30px'
        }}>
        <Typography sx={{ color: '#696969', fontSize: '16px', fontWeight: 'bold' }}>
          {data.name}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', columnGap: '70px' }}>
        {data?.currency && data?.cost && (
          <TitledBox title="Coût" icon={AttachMoneyIcon} iconColor="#e2c36f">
            <Typography
              sx={{
                fontSize: '26px',
                fontWeight: 'bold'
              }}>
              {formatAsCurrency(parseInt(data.cost as string, 10), data.currency)}
            </Typography>
          </TitledBox>
        )}

        {data?.status && (
          <TitledBox title="Statut" icon={MonitorHeartIcon} iconColor="#50D768">
            <Typography
              sx={{
                fontSize: '20px',
                lineHeight: '1',
                color: getColorForStatus(data.status),
                fontWeight: 'bold'
              }}>
              {getTranslationForStatus(data.status)}
            </Typography>
          </TitledBox>
        )}
        <TitledBox title="Région" icon={LocationOnIcon} iconColor="#4160b4">
          <Typography
            sx={{
              fontSize: '20px',
              lineHeight: '1'
            }}>
            {data.region}
          </Typography>
        </TitledBox>
      </Box>
    </SimpleWidget>
  )
}
