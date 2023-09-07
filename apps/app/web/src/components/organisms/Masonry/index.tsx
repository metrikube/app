import styled from '@emotion/styled'
import Masonry from 'masonry-layout'
import React, { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
}

const MasonryGrid = ({ children }: Props) => {
  const gridRef = useRef(null)

  useEffect(() => {
    const msnry = new Masonry(gridRef.current, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    })

    return () => {
      msnry.destroy()
    }
  }, [children])

  return (
    <MasonryContainer ref={gridRef}>
      <div className="grid-sizer"></div>
      {children}
    </MasonryContainer>
  )
}

const MasonryContainer = styled.div`
  display: flex;
  width: auto;
  margin-left: -10px;

  .grid-sizer,
  .grid-item {
    width: 33.333%;
    min-width: 33.333%;
    padding: 10px;
  }

  .grid-item--large {
    width: 66.666%;
    min-width: 66.666%;
  }
`

export default MasonryGrid
