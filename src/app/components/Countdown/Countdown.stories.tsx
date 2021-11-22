import React from 'react'
import Countdown from './Countdown'

export default {
  title: 'Component/Countdown',
  component: Countdown,
}

export const Year = (): JSX.Element => {
  const date = new Date().getTime() + 1000 * 60 * 60 * 24 * 367
  return <Countdown deadline={date} />
}
export const Month = (): JSX.Element => {
  const date = new Date().getTime() + 1000 * 60 * 60 * 24 * 30 * 3
  return <Countdown deadline={date} />
}
export const Day = (): JSX.Element => {
  const date = new Date().getTime() + 1000 * 60 * 60 * 24 * 12
  return <Countdown deadline={date} />
}
export const Hour = (): JSX.Element => {
  const date = new Date().getTime() + 1000 * 60 * 60 * 9
  return <Countdown deadline={date} />
}
