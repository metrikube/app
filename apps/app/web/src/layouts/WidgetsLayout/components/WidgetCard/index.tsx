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
import { WidgetSize, WidgetHeights, WidgetWidths } from '@metrikube/core'

interface Props {
  widget: WidgetModel
  size: WidgetSize
  children: React.ReactNode
  onAlertButtonClick: () => void
  onDeleteButtonClick: () => void
}

export const WidgetCard = ({
  size,
  widget,
  children,
  onAlertButtonClick,
  onDeleteButtonClick,
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
    <StyledGrid item className="grid-item" widgetSize={size}>
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
        <StyledCardContent>
          {children}
        </StyledCardContent>
        <StyledCardActions>
        {widget.metric.isNotifiable && (
            <Box
              sx={{ display: 'flex', columnGap: '5px', alignItems: 'center' }}>
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
        </StyledCardActions>

      </StyledCard>
    </StyledGrid>
  )
}

const StyledCard = styled(Grid)`
display: flex;
flex-direction: column;
justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => {
    return theme.shape.borderRadius * 3
  }}px;
  height: 100%;
`

const IconsActionContainer = styled.div`
  display: flex;
`

const Logo = styled.img`
  width: 2rem;
`

const StyledCardContent = styled(CardContent)`
  height: calc(100% - 72px - 45px);
  flex-grow: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  /* -ms-overflow-style: none; */
  /* scrollbar-width: none; */

  &::-webkit-scrollbar {
    width: 2px;
  }

    /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px 8px 16px;
`

const WidgetSizeWidthValueMap: { [key in WidgetWidths]: string } = {
  [WidgetWidths.Small]: '25%',
  [WidgetWidths.Medium]: '50%',
  [WidgetWidths.Large]: '100%',
}

const WidgetSizeHeightValueMap: { [key in WidgetHeights]: string } = {
  [WidgetHeights.Small]: '250px',
  [WidgetHeights.Medium]: '500px',
  [WidgetHeights.Large]: '1000px',
}



const StyledGrid = styled(Grid)<{widgetSize: WidgetSize}>`
  width: ${({ widgetSize }) => WidgetSizeWidthValueMap[widgetSize.width]};
  min-width: 25%;
  padding: 10px;
  height: ${({ widgetSize }) => WidgetSizeHeightValueMap[widgetSize.height]};
  overflow: hidden;
`