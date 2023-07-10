import React from 'react'
import styled, { CSSObject } from '@emotion/styled'
import { ButtonBase, Paper } from '@mui/material'

interface Props {
    logo: string
    label: string
    isProviderChose: boolean
    action: (...args: any[]) => void
}

const ProviderCard = ({ logo, label, isProviderChose, action }: Props) => {
    const ProviderLabel = styled.span``
    const Logo = styled.img`
    width: 45px;
    height: 45px;
  `

    const providerStyle: CSSObject = {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        textAlign: "center",
        maxWidth: "185px",
        padding: '12px'
    }

    const providerClickedStyle: CSSObject = {
        ...providerStyle,
        border: "1px solid #2196f3"
    }

    return <ButtonBase onClick={() => action()}>
        <Paper sx={isProviderChose ? providerClickedStyle : providerStyle}>
            <Logo src={logo} />
            <ProviderLabel>{label}</ProviderLabel>
        </Paper>
    </ButtonBase>
}

export default ProviderCard