import { MetrikubeMenuItem } from './models'
import styled from '@emotion/styled'
import { Menu, MenuItem } from '@mui/material'
import React from 'react'

interface Props {
  id: string
  anchorEl: HTMLElement | null
  open: boolean
  onClose: () => void
  menuItems: MetrikubeMenuItem[]
}

export const MetrikubeMenu = ({ id, anchorEl, open, onClose, menuItems }: Props) => {
  return (
    <Menu id={id} anchorEl={anchorEl} open={open} onClose={onClose}>
      {menuItems.map((item) => (
        <MenuButton onClick={item.action} key={item.key}>
          {item.icon && <item.icon />}
          {item.label}
        </MenuButton>
      ))}
    </Menu>
  )
}

const MenuButton = styled(MenuItem)`
  display: flex;
  align-items: center;
`
