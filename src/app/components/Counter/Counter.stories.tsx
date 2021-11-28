import React, { useState } from 'react'
import Counter from './Counter'

export default {
  title: 'Component/Counter',
  component: Counter,
}

export const Start1 = (): JSX.Element => {
  const [count, setCount] = useState(1)
  return (
    <div style={{ width: 20 }}>
      <Counter
        value={count}
        onIncrement={() => setCount(prev => ++prev)}
        onDecrement={() => count > 1 && setCount(prev => --prev)}
      />
    </div>
  )
}
export const Start100 = (): JSX.Element => {
  const [count, setCount] = useState(100)
  return (
    <div style={{ width: 20 }}>
      <Counter
        value={count}
        onIncrement={() => setCount(prev => ++prev)}
        onDecrement={() => count > 1 && setCount(prev => --prev)}
      />
    </div>
  )
}
