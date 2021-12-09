import React from 'react'
import styled from 'styled-components'

type TabMenuProps = {
  children: React.ReactNode
}

export default function TabMenu({ children }: TabMenuProps): JSX.Element {
  return <MenuContainer>{children}</MenuContainer>
}

const MenuContainer = styled.div`
  display: flex;
`

export const Tab = styled.button<{ active?: boolean }>`
  text-align: center;
  border: none;
  padding: 10px 0;
  flex-grow: 1;
  cursor: pointer;
  background-color: transparent;
  transition: 0.1s ease;
  border-bottom: ${({ active }) =>
    active ? 'solid 3px var(--c-secondary)' : 'solid 3px transparent'};
`
