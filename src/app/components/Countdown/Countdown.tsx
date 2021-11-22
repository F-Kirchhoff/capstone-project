import React from 'react'

type CountdownProps = {
  deadline: number
}

export default function Countdown({ deadline }: CountdownProps): JSX.Element {
  const diff = deadline - new Date().getTime()

  const isDue = diff < 0
  const yearDiff = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
  const monthDiff = Math.floor(diff / (1000 * 60 * 60 * 24 * 30))
  const dayDiff = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hourDiff = Math.floor(diff / (1000 * 60 * 60))

  const countdownString = isDue
    ? '!'
    : yearDiff
    ? `${yearDiff} y`
    : monthDiff
    ? `${monthDiff} m`
    : dayDiff
    ? `${dayDiff} d`
    : `${hourDiff} h`

  return <div>{countdownString}</div>
}
