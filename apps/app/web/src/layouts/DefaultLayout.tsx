import React from 'react'
import styled from '@emotion/styled'
import { Grid } from '@mui/material'
import Sidebar from '../components/organisms/Sidebar'

const DefaultLayout = ({ children }: React.PropsWithChildren) => {
    const Container = styled.div`
        display: flex;
        flex-direction: column;
        height: 100vh;
        padding: 1rem;
    `
    return (
        <Grid container spacing={2} columns={16}>
            <Grid item xs={3}>
                <Sidebar />
            </Grid>
            <Grid item xs={13}>
                <Container>
                    {children}
                </Container>
            </Grid>
        </Grid>
    )
}

export default DefaultLayout