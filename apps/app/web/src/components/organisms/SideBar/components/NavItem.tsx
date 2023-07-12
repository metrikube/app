// assets
// Types
import { MenuItem } from '../menuItems/models'
import styled from '@emotion/styled'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { useEffect } from 'react'
import React from 'react'

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

interface Props {
  item: MenuItem
  level: number
  selected: boolean
  onClick: () => void
}

export const NavItem = ({ item, level, selected, onClick }: Props) => {
  React.useEffect(() => {
    if (item.url === location.pathname) {
      onClick()
    }
  }, [location])

  const itemIcon = item?.icon ? (
    <item.icon />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: selected ? 8 : 6,
        height: selected ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  )

  const itemHandler = (id: string) => {
    onClick()
  }

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id.toString())
    if (currentIndex > -1) {
      onClick()
    }
    // eslint-disable-next-line
    }, []);

  return (
    <StyledListItemButton
      // component={Link}
      // to={`${item.url}`}
      selected={selected}
      onClick={() => itemHandler(item.id)}>
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant={selected ? 'h5' : 'body1'}
            color="inherit"
            sx={{ fontWeight: '500' }}>
            {item.title}
          </Typography>
        }
      />
    </StyledListItemButton>
  )
}

const StyledListItemButton = styled(ListItemButton)`
  border-radius: 8px;
  margin-bottom: 8px;
  align-items: center;
  background-color: inherit;
  padding-left: ${(props) => props.theme.spacing(2)};
  padding-right: ${(props) => props.theme.spacing(2)};
  padding-top: ${(props) => props.theme.spacing(1)};
  padding-bottom: ${(props) => props.theme.spacing(1)};
  &:hover,
  &:focus,
  &:active {
    background-color: ${(props) => props.theme.palette.primary.light};
    color: ${(props) => props.theme.palette.background.default};
  }
`
