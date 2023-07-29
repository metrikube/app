import PluginEmptyStateImg from '../assets/img/undraws/undraw_online_stats.svg'
import ProviderModal from '../components/organisms/modals/Provider.modal'
import { SetupPluginProvider } from '../contexts/SetupPlugin.context'
import DefaultLayout from '../layouts/DefaultLayout'
import { EmptyStateLayout } from '../layouts/EmptyStateLayout'
import styled from '@emotion/styled'
import { AddCircleOutline, AddchartOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'
import React, { useState } from 'react'

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
            size="medium"
            variant="contained"
            startIcon={<AddCircleOutline />}>
            Add a new provider
          </Button>
          <Button sx={{ ml: 1 }} size="medium" variant="contained" startIcon={<AddchartOutlined />}>
            Add a new widget
          </Button>
        </div>
      </StyledHeader>
      <EmptyStateLayout
        title="Get started by adding a provider"
        description="The providers are the heart of Metrikube, they allow you to visualize your metrics according to the different plugins."
        onActionButtonClick={openProviderModalHandler}
        buttonLabel="Add a new provider"
        imageAsset={PluginEmptyStateImg}
      />
      <SetupPluginProvider>
        <ProviderModal open={openedModal} setOpenModal={setOpenModal} />
      </SetupPluginProvider>
    </DefaultLayout>
  )
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default Dashboard
