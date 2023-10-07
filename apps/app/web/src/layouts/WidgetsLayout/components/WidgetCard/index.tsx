import styled from '@emotion/styled'
import { WidgetModel } from '@metrikube/core'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import NotificationsIcon from '@mui/icons-material/Notifications'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import {
  Grid,
  CardHeader,
  IconButton,
  CardContent,
  Chip,
  Box,
  Badge,
  Typography
} from '@mui/material'
import { MetrikubeMenu } from 'apps/app/web/src/components/molecules/MetrikubeMenu'
import { MetrikubeMenuItem } from 'apps/app/web/src/components/molecules/MetrikubeMenu/models'
import React from 'react'

interface Props {
  widget: WidgetModel
  size: 'small' | 'large'
  children: React.ReactNode
  onAlertButtonClick: () => void
  onDeleteButtonClick: () => void
}

export const WidgetCard = ({
  size,
  widget,
  children,
  onAlertButtonClick,
  onDeleteButtonClick
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const isMetricMenuOpen = Boolean(anchorEl)

  const avatarUrl = new URL(`/src/assets/img/${widget.plugin.type}.png`, import.meta.url).href

  const handleMoreButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const metricMenuItems: MetrikubeMenuItem[] = [
    {
      key: 'alert',
      label: 'Alertes',
      action: onAlertButtonClick,
      icon: NotificationsIcon,
      show: widget.metric.isNotifiable
    },
    {
      key: 'delete',
      label: 'Supprimer',
      action: onDeleteButtonClick,
      icon: DeleteIcon,
      variant: 'danger',
      show: true
    }
  ]

  return (
    <Grid item>
      <StyledCard>
        <CardHeader
          title={widget.name}
          titleTypographyProps={{ sx: { fontWeight: 'bold', textTransform: 'uppercase' } }}
          subheaderTypographyProps={{ sx: { textTransform: 'uppercase' } }}
          subheader={widget.metric.name}
          avatar={<Logo alt={widget.plugin.name} src={avatarUrl} />}
          action={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconsActionContainer>
                <div>
                  <IconButton onClick={handleMoreButtonClick}>
                    <MoreVertIcon />
                  </IconButton>

                  <MetrikubeMenu
                    id={`widget-menu-${widget.metric.id}`}
                    anchorEl={anchorEl}
                    open={isMetricMenuOpen}
                    onClose={() => setAnchorEl(null)}
                    menuItems={metricMenuItems}
                  />
                </div>
              </IconsActionContainer>
            </Box>
          }
        />
        <CardContent>
          {children}
          {widget.metric.isNotifiable && (
            <Box
              sx={{ display: 'flex', columnGap: '5px', alignItems: 'center', marginTop: '25px' }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'flex', alignItems: 'center', columnGap: '5px' }}>
                <NotificationsActiveOutlinedIcon fontSize="small" />
                Alertes actives :
              </Typography>
              <Typography sx={{ fontSize: '14px' }}>{widget.alertNumber}</Typography>
            </Box>
          )}
        </CardContent>
      </StyledCard>
    </Grid>
  )
}

const StyledCard = styled(Grid)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => {
    return theme.shape.borderRadius * 3
  }}px;
`

const IconsActionContainer = styled.div`
  display: flex;
`

const Logo = styled.img`
  width: 2rem;
`
