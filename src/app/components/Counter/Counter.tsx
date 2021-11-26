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
      <VoteUp onClick={onIncrement}>
        <ChevronUp />
      </VoteUp>
      <ValueView>{value}</ValueView>
      <VoteDown onClick={() => value > 0 && onDecrement()}>
        <ChevronDown />
      </VoteDown>
    </CounterContainer>
  )
}

const CounterContainer = styled.div``

const VoteUp = styled.button``

const VoteDown = styled.button``

const ValueView = styled.p``
