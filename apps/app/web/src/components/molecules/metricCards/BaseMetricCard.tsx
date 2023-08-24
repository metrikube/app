import styled from '@emotion/styled'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined'
import { Card, CardHeader, IconButton, CardContent, Menu, MenuItem, Avatar } from '@mui/material'
import React, { PropsWithChildren } from 'react'

interface Props {
  pluginName: string
  pluginCode: string
  metricId: string
  title: string
  isNotificationActivated: boolean
}

const BaseMetricCard = ({
  metricId,
  pluginName,
  pluginCode,
  title,
  isNotificationActivated,
  children
}: PropsWithChildren<Props>) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const toggleNotification = (isNotificationActivated: boolean) => {
    const newNotificationStatus = !isNotificationActivated
    console.log(newNotificationStatus)
  }

  const imageUrl = new URL(`/src/assets/img/${pluginCode}.png`, import.meta.url).href

  return (
    <Card>
      <CardHeader
        title={title}
        subheader="September 14, 2016"
        avatar={<Logo alt={pluginName} src={imageUrl} />}
        action={
          <IconsActionContainer>
            {isNotificationActivated ? (
              <IconButton
                onClick={() => toggleNotification(isNotificationActivated)}
                aria-label="alert-on">
                <NotificationsActiveOutlinedIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => toggleNotification(isNotificationActivated)}
                aria-label="alert-off">
                <NotificationsOffOutlinedIcon />
              </IconButton>
            )}
            <div>
              <IconButton onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id={`metric-menu-${metricId}`}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': `button-${metricId}`
                }}>
                <MenuItem onClick={handleClose}>Alerte</MenuItem>
                <MenuItem onClick={handleClose}>Modifier</MenuItem>
                <DeleteMenuItem onClick={handleClose}>Supprimer</DeleteMenuItem>
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
