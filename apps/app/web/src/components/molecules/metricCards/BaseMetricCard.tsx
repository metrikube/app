import { DashboardContext } from '../../../contexts/Dashboard.context'
import styled from '@emotion/styled'
import { ActiveMetricModel } from '@metrikube/core'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Card, CardHeader, IconButton, CardContent, Menu, MenuItem } from '@mui/material'
import React, { Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react'

interface Props {
  activeMetric: ActiveMetricModel
  setIsMetricAlertsModalOpened: Dispatch<SetStateAction<boolean>>
  setIsMetricDeletionModalOpened: Dispatch<SetStateAction<boolean>>
}

const BaseMetricCard = ({
  activeMetric,
  setIsMetricAlertsModalOpened,
  setIsMetricDeletionModalOpened,
  children
}: PropsWithChildren<Props>) => {
  const { setSelectedActiveMetric } = useContext(DashboardContext)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedActiveMetric(activeMetric)
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const openMetricAlertsModal = () => {
    setIsMetricAlertsModalOpened(true)
    handleClose()
  }

  const openDeletionMetricModal = () => {
    setIsMetricDeletionModalOpened(true)
    handleClose()
  }

  const imageUrl = new URL(`/src/assets/img/${activeMetric.plugin.type}.png`, import.meta.url).href

  return (
    <Card>
      <CardHeader
        title={activeMetric.name}
        subheader={activeMetric.metric.name}
        avatar={<Logo alt={activeMetric.plugin.name} src={imageUrl} />}
        action={
          <IconsActionContainer>
            <div>
              <IconButton onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id={`metric-menu-${activeMetric.metric.id}`}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': `button-${activeMetric.metric.id}`
                }}>
                <MenuItem onClick={openMetricAlertsModal}>Alerte</MenuItem>
                <DeleteMenuItem onClick={openDeletionMetricModal}>Supprimer</DeleteMenuItem>
              </Menu>
            </div>
          </IconsActionContainer>
        }
      />
      <CardContent>{children}</CardContent>
    </Card>
  )
}

const IconsActionContainer = styled.div`
  display: flex;
`

const DeleteMenuItem = styled(MenuItem)`
  color: red;
  text-transform: uppercase;
`
const Logo = styled.img`
  width: 2rem;
`
export default BaseMetricCard
