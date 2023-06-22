import React from 'react'
import styled from '@emotion/styled'
import { Grid, Button } from '@mui/material';
import DefaultLayout from '../layouts/DefaultLayout'
import { AddCircleOutline } from '@mui/icons-material';
import ProviderModal from '../components/organisms/Provider.modal';

const Dashboard = () => {
  const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `

  const Body = styled.body`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `

  const openProviderModalHandler = () => {
    console.log("openProviderModalHandler")
  }

  return (
    <DefaultLayout>
      <Header>
        <h3>NOM DU PROJET</h3>
        <div>
          <Button onClick={openProviderModalHandler} size="small" variant="outlined" startIcon={<AddCircleOutline />}>
            Add a new provider
          </Button>
          <Button sx={{ ml: 1 }} size="small" variant="outlined" startIcon={<AddCircleOutline />}>
            Add a new widget
          </Button>
        </div>
      </Header>
      <Body>
        There is no plugin installed
      </Body>
      <ProviderModal />
    </DefaultLayout>
  )
}

export default Dashboard