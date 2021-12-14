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
  border-bottom: solid 1px rgb(0 0 0 / 30%);
`

export const Tab = styled.button<{ active?: boolean }>`
  text-align: center;
  font-weight: bold;
  text-transform: capitalize;
  border: none;
  padding: 10px 0;
  flex-grow: 1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  transition: 0.1s ease;
  border-bottom: ${({ active }) =>
    active ? 'solid 3px var(--c-secondary)' : 'solid 3px transparent'};
`
