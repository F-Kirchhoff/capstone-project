import React, { useState } from 'react'
import SliderMenu from './SliderMenu'

export default {
  title: 'Component/SliderMenu',
  component: SliderMenu,
}

export const Regular = (): JSX.Element => {
  const options = [
    { id: 'pro', text: 'pro (9)' },
    { id: 'neutral', text: 'neutral (4)' },
    { id: 'concerns', text: 'concerns (2)' },
  ]
  const [option, setOption] = useState('pro')
  return (
    <SliderMenu
      options={options}
      onSelect={setOption}
      selectedOption={option}
    />
  )
}
