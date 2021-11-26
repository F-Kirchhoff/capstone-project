import React, { useState } from 'react'
import Counter from './Counter'

export default {
  title: 'Component/Counter',
  component: Counter,
}

export const Start0 = (): JSX.Element => {
  const [count, setCount] = useState(0)
  return (
    <div style={{ width: 20 }}>
      <Counter
        value={count}
        onIncrement={() => setCount(prev => ++prev)}
        onDecrement={() => setCount(prev => --prev)}
      />
    </div>
  )
}
export const Start100 = (): JSX.Element => {
  const [count, setCount] = useState(100)
  return (
    <div style={{ width: 30 }}>
      <Counter
        value={count}
        onIncrement={() => setCount(prev => ++prev)}
        onDecrement={() => setCount(prev => --prev)}
      />
    </div>
  )
}
