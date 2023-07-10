import Sidebar from '../components/organisms/Sidebar'
import styled from '@emotion/styled'
import { Grid } from '@mui/material'
import React from 'react'

const DefaultLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Grid container spacing={2} columns={16}>
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={13}>
        <Container>{children}</Container>
      </Grid>
    </Grid>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem;
`

export default DefaultLayout
