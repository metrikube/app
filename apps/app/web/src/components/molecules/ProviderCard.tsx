import styled, { CSSObject } from '@emotion/styled'
import { ButtonBase, Paper } from '@mui/material'
import React from 'react'

interface Props {
  logo: string
  label: string
  selected: boolean
  action: (...args: any[]) => void
}

const ProviderCard = ({ logo, label, selected, action }: Props) => {
  return (
    <ButtonBase onClick={() => action()}>
      <StyledPaper selected={selected}>
        <Logo src={logo} />
        <ProviderLabel>{label}</ProviderLabel>
      </StyledPaper>
    </ButtonBase>
  )
}

const ProviderLabel = styled.span``

const Logo = styled.img`
  width: 45px;
  height: 45px;
`

const StyledPaper = styled(Paper)<{ selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: center;
  max-width: 185px;
  padding: 12px;

  ${({ selected }) =>
    selected &&
    `
			border: '1px solid #2196f3'
		`}
`

export default ProviderCard
