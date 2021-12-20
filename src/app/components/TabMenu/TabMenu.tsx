import React from 'react'
import styled, { css } from 'styled-components'

type TabMenuProps = {
  children: React.ReactNode
}

export default function TabMenu({ children }: TabMenuProps): JSX.Element {
  return <MenuContainer>{children}</MenuContainer>
}

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  border-bottom: solid 1px rgb(0 0 0 / 30%);
`

export const Tab = styled.button<{ active?: boolean }>`
  position: relative;
  text-align: center;
  font-weight: bold;
  text-transform: capitalize;
  border: none;
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  transition: 0.1s ease;
  color: var(--c-gray-700);
  ${({ active }) =>
    active &&
    css`
      color: var(--c-primary);

      &::after {
        content: '';
        width: 100%;
        height: 3px;
        background-color: var(--c-primary);
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 999px;
      }
    `};
`
