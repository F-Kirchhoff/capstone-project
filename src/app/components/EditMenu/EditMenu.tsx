import React from 'react'
import { FaBan, FaEdit } from 'react-icons/fa'
import DropdownMenu, { MenuItem } from '../DropdownMenu/DropdownMenu'

type EditMenuProps = {
  onEdit: () => void
  onDelete: () => void
  vertical?: boolean
}

export default function EditMenu({
  onEdit,
  onDelete,
  vertical,
}: EditMenuProps): JSX.Element {
  return (
    <DropdownMenu vertical={vertical}>
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
