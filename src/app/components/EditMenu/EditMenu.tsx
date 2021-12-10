import React from 'react'
import { FaBan, FaEdit } from 'react-icons/fa'
import DropdownMenu, { MenuItem } from '../DropdownMenu/DropdownMenu'

type EditMenuProps = {
  onEdit: () => void
  onDelete: () => void
}

export default function EditMenu({
  onEdit,
  onDelete,
}: EditMenuProps): JSX.Element {
  return (
    <DropdownMenu>
      <MenuItem onClick={onEdit}>
        <FaEdit />
        <span>edit</span>
      </MenuItem>
      <MenuItem onClick={onDelete}>
        <FaBan color="var(--c-alert)" />
        <span>delete</span>
      </MenuItem>
    </DropdownMenu>
  )
}
