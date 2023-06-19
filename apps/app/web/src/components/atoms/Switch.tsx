import * as React from 'react'
import { styled } from '@mui/material/styles'
import { Switch as MuiSwitch } from '@mui/material'

export const Switch = styled(MuiSwitch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2
  }
}))
