import { TitledBox } from '../molecules/TitledBox'
import SimpleWidget from '../molecules/WidgetsGenericTemplates/SimpleWidget'
import { ApiAWSSingleResourceInstanceResult } from '@metrikube/common'
import { WidgetModel, formatAsCurrency } from '@metrikube/core'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import HistoryIcon from '@mui/icons-material/History'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'

interface Props {
  widget: WidgetModel
}

export const AwsBucketSingleInstance = ({ widget }: Props) => {
  const data = widget.data as ApiAWSSingleResourceInstanceResult
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
          {data.name}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', columnGap: '70px' }}>
        {data?.currency && data?.cost && (
          <TitledBox title="Coût" icon={AttachMoneyIcon} iconColor="#e2c36f">
            <Typography
              sx={{
                fontSize: '30px',
                fontWeight: 'bold'
              }}>
              {formatAsCurrency(parseInt(data.cost as string, 10), data.currency)}
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
        {data?.additionnalData && (data.additionnalData as any)?.creationDate && (
          <TitledBox title="Date de création" icon={HistoryIcon} iconColor="#48e052">
            <Typography
              sx={{
                fontSize: '20px',
                lineHeight: '1'
              }}>
              {dayjs((data.additionnalData as { creationDate: Date })?.creationDate).format(
                'DD/MM/YYYY'
              )}
            </Typography>
          </TitledBox>
        )}
      </Box>
    </SimpleWidget>
  )
}
