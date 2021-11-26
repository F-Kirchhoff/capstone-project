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
  width: 3rem;
  display: grid;
  justify-content: center;
  align-content: center;
  text-align: center;
`

const VoteButton = styled.button<{ displayType?: 'up' | 'down' }>`
  background-color: transparent;
  border: none;
  width: 1.7rem;
  padding: 0 3px;
  height: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`

const ValueView = styled.p``
