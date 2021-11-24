import React from 'react'
import styled from 'styled-components'

export default function Logo(): JSX.Element {
  return <LogoText>D'Artagan</LogoText>
}

const LogoText = styled.h1`
  color: var(--c-primary);
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Playfair';
`
