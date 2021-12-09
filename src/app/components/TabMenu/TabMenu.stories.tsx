import React, { useState } from 'react'
import TabMenu from './TabMenu'

export default {
  title: 'Component/TabMenu',
  component: TabMenu,
}

export const Regular = (): JSX.Element => {
  const options = [
    { id: 'pro', text: 'pro (9)' },
    { id: 'neutral', text: 'neutral (4)' },
    { id: 'concerns', text: 'concerns (2)' },
  ]
  const [option, setOption] = useState('pro')
  return (
    <TabMenu options={options} onSelect={setOption} selectedOption={option} />
  )
}
