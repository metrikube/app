import styled from '@emotion/styled'
import { ActiveMetricModel } from '@metrikube/core'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Grid, CardHeader, IconButton, CardContent, MenuItem } from '@mui/material'
import { MetrikubeMenu } from 'apps/app/web/src/components/molecules/MetrikubeMenu'
import { MetrikubeMenuItem } from 'apps/app/web/src/components/molecules/MetrikubeMenu/models'
import React from 'react'

interface Props {
  metric: ActiveMetricModel
  size: 'small' | 'large'
  children: React.ReactNode
  onAlertButtonClick: () => void
  onDeleteButtonClick: () => void
}

export const MetricCard = ({
  size,
  metric,
  children,
  onAlertButtonClick,
  onDeleteButtonClick
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const isMetricMenuOpen = Boolean(anchorEl)

  const avatarUrl = new URL(`/src/assets/img/${metric.plugin.type}.png`, import.meta.url).href

  const handleMoreButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const metricMenuItems: MetrikubeMenuItem[] = [
    {
      key: 'alert',
      label: 'Alertes',
      action: onAlertButtonClick,
      icon: NotificationsIcon
    },
    {
      key: 'delete',
      label: 'Supprimer',
      action: onDeleteButtonClick,
      icon: DeleteIcon,
      variant: 'danger'
    }
  ]


  return (
    <Grid item >
      <StyledCard>
        <CardHeader
          title={metric.name}
          subheader={metric.metric.name}
          avatar={<Logo alt={metric.plugin.name} src={avatarUrl} />}
          action={
            <IconsActionContainer>
              <div>
                <IconButton onClick={handleMoreButtonClick}>
                  <MoreVertIcon />
                </IconButton>
                <MetrikubeMenu
                  id={`metric-menu-${metric.metric.id}`}
                  anchorEl={anchorEl}
                  open={isMetricMenuOpen}
                  onClose={() => setAnchorEl(null)}
                  menuItems={metricMenuItems}
                />
              </div>
            </IconsActionContainer>
          }
        />
        <CardContent>{children}</CardContent>
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
