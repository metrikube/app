import { SvgIconComponent } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

interface Props {
  title: string
  icon?: SvgIconComponent
  iconColor?: string
  children: React.ReactNode
}

export const TitledBox = (props: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '57px'
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {props.icon && <props.icon sx={{ color: props.iconColor }} />}
        <Typography sx={{ color: '#696969' }}>{props.title}</Typography>
      </Box>
      <Box sx={{ flexGrow: 1, marginTop: '10px', display: 'flex', alignItems: 'flex-end' }}>
        {props.children}
      </Box>
    </Box>
  )
}
