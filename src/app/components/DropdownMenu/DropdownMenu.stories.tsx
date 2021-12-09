import React from 'react'
import DropdownMenu, { MenuItem } from './DropdownMenu'
import { FaEdit, FaBan } from 'react-icons/fa'

export default {
  title: 'Component/DropdownMenu',
  component: DropdownMenu,
}

export const Regular = (): JSX.Element => {
  return (
    <div
      style={{
        width: '500px',
        height: 100,
        border: 'solid 1px magenta',
        position: 'relative',
      }}
    >
      <DropdownMenu>
        <MenuItem onClick={() => console.log('Edit me!')}>
          <FaEdit />
          <span>edit</span>
        </MenuItem>
        <MenuItem onClick={() => console.log('Delete me!')}>
          <FaBan color="var(--c-alert)" />
          <span>delete</span>
        </MenuItem>
      </DropdownMenu>
    </div>
  )
}
