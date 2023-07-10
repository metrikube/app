import styled from '@emotion/styled'
import { DashboardRounded, SettingsRounded } from '@mui/icons-material'
import { ListItemIcon, ListItemText, MenuItem, MenuList, Paper } from '@mui/material'
import React from 'react'

const Sidebar = () => {
  return (
    <StylePaper elevation={6}>
      <h2>METRIKUBE</h2>
      <StyledMenuList>
        <MenuItem>
          <ListItemIcon>
            <DashboardRounded />
          </ListItemIcon>
          <ListItemText>Tableau de bord</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SettingsRounded />
          </ListItemIcon>
          <ListItemText>Paramètres</ListItemText>
        </MenuItem>
      </StyledMenuList>
    </StylePaper>
  )
}

const StylePaper = styled(Paper)`
  height: 100vh;
  text-align: center;
  border-start-end-radius: 20;
  border-end-end-radius: 20;
`

const StyledMenuList = styled(MenuList)`
  text-align: left;
`

export default Sidebar
