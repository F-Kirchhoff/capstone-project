import React from 'react'
import Button from './Button'

export default {
  title: 'Component/Button',
  component: Button,
}

export const Regular = (): JSX.Element => <Button>A test button</Button>
export const Highlight = (): JSX.Element => (
  <Button highlight>Highlight!</Button>
)
export const With_Action = (): JSX.Element => (
  <Button onClick={() => alert('Test Passed!')}>A test button</Button>
)
