import React from 'react'
import styled from 'styled-components'

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
    ? `${yearDiff}Y`
    : monthDiff
    ? `${monthDiff}M`
    : dayDiff
    ? `${dayDiff}D`
    : `${hourDiff}H`

  return <CountdownContainer>{countdownString}</CountdownContainer>
}

const CountdownContainer = styled.div`
  font-size: 2rem;
  display: inline-block;
  font-weight: bold;
  padding: 20px;
  background-color: var(--c-secondary);
  color: var(--c-primary);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`
