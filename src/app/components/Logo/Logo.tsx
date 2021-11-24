import React from 'react'
import styled from 'styled-components'

export default function Logo(): JSX.Element {
  return <LogoText>D'Artagan</LogoText>
}

const LogoText = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Playfair';
`
