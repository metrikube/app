import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Button } from '@mui/material';
import DefaultLayout from '../layouts/DefaultLayout'
import { AddCircleOutline } from '@mui/icons-material';
import ProviderModal from '../components/organisms/modals/Provider.modal';

const Dashboard = () => {

  const [openedModal, setOpenModal] = useState(false)
  const openProviderModalHandler = () => {
    setOpenModal(true)
  }

  return (
    <DefaultLayout>
      <StyledHeader>
        <h3>NOM DU PROJET</h3>
        <div>
          <Button
            onClick={openProviderModalHandler}
            size="small"
            variant="outlined"
            startIcon={<AddCircleOutline />}>
            Add a new provider
          </Button>
          <Button sx={{ ml: 1 }} size="small" variant="outlined" startIcon={<AddCircleOutline />}>
            Add a new widget
          </Button>
        </div>
      </StyledHeader>
      <StyledBody>
        There is no plugin installed
      </StyledBody>
      <ProviderModal open={openedModal} setOpenModal={setOpenModal} />
    </DefaultLayout>
  )
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledBody = styled.body`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default Dashboard
