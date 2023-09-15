import { SvgIconComponent } from '@mui/icons-material'
import { Box, Typography, Tooltip } from '@mui/material'
import React from 'react'

interface Props {
  label: string
  dataItems: {
    icon: SvgIconComponent
    value: string
    tooltipContent?: string
  }[]
}

export const LabelAndIconsWidget = (props: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '70px'
      }}>
      <Typography sx={{ color: '#696969', fontSize: '18px' }}>{props.label}</Typography>
      <Box sx={{ flexGrow: 1, marginTop: '10px', display: 'flex', alignItems: 'flex-end' }}>
        {props.dataItems.map((dataItem) => (
          <Tooltip title={dataItem.tooltipContent} key={dataItem.value}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                marginRight: '20px'
              }}>
              <dataItem.icon sx={{ color: '#4160B4' }} />
              <Typography sx={{ color: '#696969' }}>{dataItem.value}</Typography>
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  )
}
