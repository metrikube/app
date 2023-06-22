import React from 'react'
import Drawer from '@mui/material/Drawer';
import { Box, MenuItem, MenuList } from '@mui/material';

const BoxStyle = {
    width: "18vw",
    textAlign: "center",
}


const Sidebar = () => {
    return (
        <Drawer
            open={true}
            hideBackdrop={true}
            onClose={() => { }}
        >
            <Box sx={BoxStyle}>
                <h2>METRIKUBE.</h2>
                <MenuList>
                    <MenuItem>Tableau de bord</MenuItem>
                    <MenuItem>Paramètres</MenuItem>
                </MenuList>
            </Box>
        </Drawer>
    )
}

export default Sidebar