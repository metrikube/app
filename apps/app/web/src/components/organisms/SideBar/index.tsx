import { NavItem } from './components/NavItem'
import { menuItems } from './menuItems'
import styled from '@emotion/styled'
import { Box, MenuList, Paper, Typography } from '@mui/material'
// eslint-disable-next-line @nx/enforce-module-boundaries
import MetrikubeLogo from 'apps/app/web/src/assets/img/metrikube-logo.png'
import React from 'react'

const Sidebar = () => {
  return (
    <StylePaper elevation={6}>
      <Brand>
        <img src={MetrikubeLogo} style={{ height: '50px' }} />
        <Typography variant="h5">MetriKube</Typography>
      </Brand>
      <StyledMenuList>
        {menuItems.map((item) => (
          <NavItem key={item.id} item={item} level={0} selected={false} onClick={() => {}} />
        ))}
      </StyledMenuList>
    </StylePaper>
  )
}

const StylePaper = styled(Paper)`
  height: 100vh;
  text-align: center;
  border-start-end-radius: 20;
  border-end-end-radius: 20;
  padding: ${(props) => props.theme.spacing(2)};
`

const StyledMenuList = styled(MenuList)`
  text-align: left;
`

const Brand = styled(Box)`
  display: flex;
  column-gap: ${(props) => props.theme.spacing(2)};
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing(4)};
`

export default Sidebar
