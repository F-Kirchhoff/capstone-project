import React from 'react'
import DropdownMenu from './DropdownMenu'

export default {
  title: 'Component/DropdownMenu',
  component: DropdownMenu,
}

export const Regular = (): JSX.Element => {
  return (
    <div style={{ width: '100vw', height: 100, border: 'solid 1px magenta' }}>
      <DropdownMenu></DropdownMenu>
    </div>
  )
}
