import styled from '@emotion/styled'
import { Grid } from '@mui/material'
import React from 'react'

const DefaultLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <StyledGrid container spacing={2} columns={16}>
      <Grid item xs={16}>
        <Container>{children}</Container>
      </Grid>
    </StyledGrid>
  )
}

const StyledGrid = styled(Grid)`
  background-color: ${({ theme }) => theme.palette.background.default};
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 82px);
  padding: 1rem;
  margin-top: 4rem;
`

export default DefaultLayout
