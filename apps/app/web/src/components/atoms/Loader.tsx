import styled from '@emotion/styled'
import { CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => (
  <LoaderWrapper>
    <CircularProgress color="primary" />
  </LoaderWrapper>
)

const LoaderWrapper = styled.div`
  width: 100%;
`

export default Loader
