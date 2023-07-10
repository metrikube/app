import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Button } from '@mui/material';
import DefaultLayout from '../layouts/DefaultLayout'
import { AddCircleOutline } from '@mui/icons-material';
import ProviderModal from '../components/organisms/modals/Provider.modal';

const Dashboard = () => {
  const [openedModal, setOpenModal] = useState(false)

  const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `

  const Body = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `

  const openProviderModalHandler = () => {
    setOpenModal(true)
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
      <ProviderModal open={openedModal} setOpenModal={setOpenModal} />
    </DefaultLayout>
  )
}

export default Dashboard