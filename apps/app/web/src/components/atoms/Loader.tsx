import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'

import React from 'react'

const LoaderWrapper = styled('div')({
  width: '100%'
})

const Loader = () => (
  <LoaderWrapper>
    <CircularProgress color="primary" />
  </LoaderWrapper>
)

export default Loader
