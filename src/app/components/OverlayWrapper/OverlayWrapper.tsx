import React from 'react'
import styled from 'styled-components'

type OverlayWrapperProps = {
  onReturn: () => void
  children: React.ReactNode
  transparent?: boolean
}

export default function OverlayWrapper({
  children,
  onReturn,
  transparent,
}: OverlayWrapperProps): JSX.Element {
  return (
    <Wrapper>
      <FormBackground onClick={onReturn} transparent={transparent} />
      {children}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  z-index: 1000;
`
const FormBackground = styled.div<{ transparent?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${({ transparent }) =>
    transparent ? 'transparent' : 'rgba(0, 0, 0, 0.7)'};
`
