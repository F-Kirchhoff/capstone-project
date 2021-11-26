import React from 'react'
import styled from 'styled-components'
import ChevronDown from '../../Icons/ChevronDown'
import ChevronUp from '../../Icons/ChevronUp'

type CounterProps = {
  value: number
  onIncrement: () => void
  onDecrement: () => void
}

export default function Counter({
  value,
  onIncrement,
  onDecrement,
}: CounterProps): JSX.Element {
  return (
    <CounterContainer>
      <VoteButton displayType="up" onClick={onIncrement}>
        <ChevronUp />
      </VoteButton>
      <ValueView>{value}</ValueView>
      <VoteButton displayType="down" onClick={() => value > 0 && onDecrement()}>
        <ChevronDown />
      </VoteButton>
    </CounterContainer>
  )
}

const CounterContainer = styled.div`
  max-width: 3rem;
  display: grid;
  justify-content: center;
  align-content: center;
  text-align: center;
  border: solid 1px magenta;
`

const VoteButton = styled.button<{ displayType?: 'up' | 'down' }>`
  background-color: transparent;
  align-self: center;
  justify-self: center;
  border: none;
  width: 20px;
  height: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`
