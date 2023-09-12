import { MetrikubeMenuItem } from './models'
import styled from '@emotion/styled'
import { Menu, MenuItem, Theme } from '@mui/material'
import React from 'react'

interface Props {
  id: string
  anchorEl: HTMLElement | null
  open: boolean
  onClose: () => void
  menuItems: MetrikubeMenuItem[]
}

export const MetrikubeMenu = ({ id, anchorEl, open, onClose, menuItems }: Props) => {
  const handleItemClick = (item: MetrikubeMenuItem) => {
    item.action()
    onClose()
  }

  return (
    <Menu id={id} anchorEl={anchorEl} open={open} onClose={onClose}>
      {menuItems.map(
        (item) =>
          item.show && (
            <MenuButton onClick={() => handleItemClick(item)} key={item.key} variant={item.variant}>
              {item.icon && (
                <IconWrapper>
                  <item.icon />
                </IconWrapper>
              )}
              {item.label}
            </MenuButton>
          )
      )}
    </Menu>
  )
}

const PrimaryVariantStyle = (theme: Theme) => `
  color: ${theme.palette.primary.light};
  :hover {
    color: ${theme.palette.primary.dark};
    background-color: transparent;
  }
`

const InfoVariantStyle = (theme: Theme) => `
  color: ${theme.palette.info.light};
  :hover {
    color: ${theme.palette.info.dark};
    background-color: transparent;
  }
`

const DangerVariantStyle = (theme: Theme) => `
  color: ${theme.palette.error.light};
  :hover {
    color: ${theme.palette.error.dark};
    background-color: transparent;
  }
`

const variantStyleMap = {
  primary: PrimaryVariantStyle,
  danger: DangerVariantStyle,
  info: InfoVariantStyle
}

const MenuButton = styled(MenuItem)<{ variant?: 'primary' | 'danger' | 'info' }>`
  display: flex;
  align-items: center;

  ${({ variant, theme }) => {
    return variantStyleMap[variant || 'primary'](theme as Theme)
  }};
`

const IconWrapper = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
`
