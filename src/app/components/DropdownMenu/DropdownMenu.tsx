import React, { useState } from 'react'

export default function DropdownMenu({
  children,
}: React.PropsWithChildren<React.ReactFragment>): JSX.Element {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <>
      // icon
      {showMenu && (
        <MenuContainer>
          {children.map(child => (
            <MenuItem></MenuItem>
          ))}
        </MenuContainer>
      )}
    </>
  )
}
