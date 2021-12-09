import React, { useState } from 'react'
import styled from 'styled-components'
import OverlayWrapper from '../OverlayWrapper/OverlayWrapper'
import { FaEllipsisH } from 'react-icons/fa'

export default function DropdownMenu({
  children,
}: React.PropsWithChildren<React.ReactFragment>): JSX.Element {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <>
      <MenuButton onClick={() => setShowMenu(true)} />
      {showMenu && (
        <OverlayWrapper onReturn={() => setShowMenu(false)} transparent>
          <MenuContainer onClick={() => setShowMenu(false)}>
            {children}
          </MenuContainer>
        </OverlayWrapper>
      )}
    </>
  )
}

const MenuContainer = styled.ul`
  position: absolute;
  right: 4px;
  top: 18px;
  border-radius: 5px;
  background-color: var(--c-gray-200);
  border: solid 1px var(--c-gray-500);
  font-size: 0.9rem;
  overflow: hidden;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  & > li:nth-child(n + 2) {
    border-top: solid 1px var(--c-gray-500);
  }
`
const MenuButton = styled(FaEllipsisH)`
  margin: 0 0;
  position: absolute;
  top: 0;
  right: 8px;
  font-size: 18px;
  cursor: pointer;
`
export const MenuItem = styled.li`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  text-align: right;
  padding: 7px;

  &:hover {
    background-color: var(--c-gray-100);
  }
`
