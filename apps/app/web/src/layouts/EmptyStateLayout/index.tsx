import { AddOutlined } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'

interface Props {
  title: string
  description: string
  onActionButtonClick: () => void
  buttonLabel: string
  imageAsset: string
}

export const EmptyStateLayout = ({
  title,
  description,
  onActionButtonClick,
  buttonLabel,
  imageAsset
}: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: '20px',
        minHeight: 'calc(100% - 100px)'
      }}>
      <img src={imageAsset} width="40%" style={{ maxWidth: '400px' }} />
      <Typography variant="h5" gutterBottom sx={{ marginTop: '10px', fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ maxWidth: '400px', textAlign: 'center' }}>
        {description}
      </Typography>
      <Button
        size="large"
        onClick={onActionButtonClick}
        sx={{
          marginTop: '20px',
          display: 'flex',
          columnGap: '0.5rem'
        }}
        variant="contained">
        <AddOutlined /> {buttonLabel}
      </Button>
    </Box>
  )
}
