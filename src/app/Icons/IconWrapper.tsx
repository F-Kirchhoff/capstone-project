import React from 'react'
import styled from 'styled-components'

type WrapperProps = {
  children: React.ReactNode
  width?: string
}

export default function IconWrapper({
  width,
  children,
}: WrapperProps): JSX.Element {
  return <Wrapper width={width}>{children}</Wrapper>
}

const Wrapper = styled.div<Partial<WrapperProps>>`
  width: ${({ width }) => (width ? `${width}px` : '24px')};
  display: flex;
  justify-content: center;
  align-items: center;
`
