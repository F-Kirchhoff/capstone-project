import React from 'react'
import styled from 'styled-components'

type OverlayWrapperProps = {
  onReturn: () => void
  children: React.ReactNode
}

export default function OverlayWrapper({
  children,
  onReturn,
}: OverlayWrapperProps): JSX.Element {
  return (
    <Wrapper>
      <FormBackground onClick={onReturn} />
      {children}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`
const FormBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
`
