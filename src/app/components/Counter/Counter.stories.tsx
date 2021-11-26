import React, { useState } from 'react'
import Counter from './Counter'

export default {
  title: 'Component/Counter',
  component: Counter,
}

export const StepSize1 = (): JSX.Element => {
  const [count, setCount] = useState(0)
  return (
    <>
      <Counter
        value={count}
        onIncrement={() => setCount(prev => ++prev)}
        onDecrement={() => setCount(prev => --prev)}
      />
    </>
  )
}
