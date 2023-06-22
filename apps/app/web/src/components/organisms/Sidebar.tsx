import React, { useState } from 'react'
import styled from '@emotion/styled'
import { CSSObject, ListItemIcon, ListItemText, MenuItem, MenuList, Paper } from '@mui/material';
import { DashboardRounded, SettingsRounded } from '@mui/icons-material';

const PaperStyle: CSSObject = {
    height: "100vh",
    textAlign: "center",
    borderStartEndRadius: 20,
    borderEndEndRadius: 20
}

const MenuListStyle: CSSObject = {
    textAlign: "left",
}

const Sidebar = () => {
    const [isSidebarOpened, setIsSidebarOpened] = useState(true)
    return (
        <Paper elevation={6} sx={PaperStyle}>
            <h2>METRIKUBE.</h2>
            <MenuList sx={MenuListStyle}>
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
            </MenuList>
        </Paper>
    )
}

export default Sidebar