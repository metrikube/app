import styled from '@emotion/styled'
import { ButtonBase, Paper } from '@mui/material'
import React from 'react'

interface Props {
  type: string
  label: string
  selected: boolean
  onClick: () => void
}

const ProviderCard = ({ type, label, selected, onClick }: Props) => {
  const avatarUrl = new URL(`/src/assets/img/${type}.png`, import.meta.url).href
  return (
    <ButtonBase onClick={onClick}>
      <StyledPaper selected={selected} elevation={5} variant="outlined">
        <Logo src={avatarUrl} />
        <ProviderLabel>{label}</ProviderLabel>
      </StyledPaper>
    </ButtonBase>
  )
}

const ProviderLabel = styled.span`
  font-weight: bold;
  font-size: 14px;
`

const Logo = styled.img`
  width: 30px;
  height: 30px;
`

const StyledPaper = styled(Paper)<{ selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: center;
  max-width: 185px;
  padding: 12px;
  height: 60px;

  ${({ selected }) => selected && `border: 1px solid #2196f3`}
`

export default ProviderCard
