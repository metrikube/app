import { Box } from '@mui/material'
import React, { PropsWithChildren } from 'react'

const SimpleWidget = ({ children }: PropsWithChildren) => {
  return <Box sx={{ display: 'flex', flexDirection: 'column' }}>{children}</Box>
}

export default SimpleWidget
