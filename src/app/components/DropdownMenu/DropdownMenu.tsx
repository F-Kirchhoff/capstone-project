import React, { useState } from 'react'
import styled from 'styled-components'
import OverlayWrapper from '../OverlayWrapper/OverlayWrapper'
import { FaEllipsisH, FaEllipsisV } from 'react-icons/fa'

type DropDownMenuProps = {
  children: React.ReactNode
  vertial?: boolean
}

export default function DropdownMenu({
  children,
  vertial,
}: DropDownMenuProps): JSX.Element {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <>
      <MenuButton onClick={() => setShowMenu(true)}>
        {vertial ? <FaEllipsisV /> : <FaEllipsisH />}
      </MenuButton>
      {showMenu && (
        <OverlayWrapper onReturn={() => setShowMenu(false)} transparent>
          <FixedWrapper>
            <MenuContainer onClick={() => setShowMenu(false)}>
              {children}
            </MenuContainer>
          </FixedWrapper>
        </OverlayWrapper>
      )}
    </>
  )
}

const FixedWrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 4px;
`

const MenuContainer = styled.ul`
  position: fixed;
  z-index: 1000;
  transform: translateX(-100%);
  border-radius: 5px;
  background-color: var(--c-gray-100);
  border: solid 1px var(--c-gray-500);
  font-size: 0.9rem;
  overflow: hidden;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`
const MenuButton = styled.div`
  color: rgba(0, 0, 0, 0.7);
  margin: 0 0;
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 1rem;
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
    background-color: var(--c-light);
  }
`
