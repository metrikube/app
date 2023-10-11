import styled from '@emotion/styled'
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'

interface Props {
  children: React.ReactNode
  title?: string
  actionButtonTitle?: string
  onActionButtonClick?: () => void
}

const OutlinedCard = ({ children, title, actionButtonTitle, onActionButtonClick }: Props) => {
  return (
    <StyledCard variant="outlined">
      <CardContent>
        {Boolean(title) && (
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {title}
          </Typography>
        )}
        <StyledBox>{children}</StyledBox>
      </CardContent>
      {Boolean(actionButtonTitle) && Boolean(onActionButtonClick) && (
        <CardActions>
          <Button size="small" variant="contained">
            {actionButtonTitle}
          </Button>
        </CardActions>
      )}
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

const StyledBox = styled(Box)`
  display: flex;
  row-gap: ${({ theme }) => theme.spacing(2)};
  column-gap: ${({ theme }) => theme.spacing(2)};
  flex-wrap: wrap;
`

export default OutlinedCard
