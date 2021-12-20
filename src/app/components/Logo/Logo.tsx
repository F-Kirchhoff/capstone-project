import React from 'react'
import styled from 'styled-components'

export default function Logo({
  short,
  light,
  onClick,
}: {
  short?: boolean
  light?: boolean
  onClick?: () => void
}): JSX.Element {
  return (
    <LogoContainer light={light} onClick={onClick}>
      D<span>’</span>
      {!short && 'Artagnan'}
    </LogoContainer>
  )
}

const LogoContainer = styled.h1<{ light?: boolean }>`
  @font-face {
    font-family: Avia;
    src: url('/src/app/assets/localfonts/Avia-Bold-Regular.woff');
  }
  transform-origin: top left;
  display: flex;
  font-family: 'Avia', Arial;
  letter-spacing: 1px;
  color: ${({ light }) => (light ? 'var(--c-light)' : 'var(--c-primary)')};
  & > span {
    display: block;
    padding: 0 3px;
    transform: scale(1.3) translateY(-0.13rem);
    transform-origin: top center;
    background: linear-gradient(
      170deg,
      #ed9716 20%,
      #e041a1 25%,
      #7555b9 35%,
      #318ec4 50%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`
