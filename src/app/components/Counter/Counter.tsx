import React from 'react'
import styled from 'styled-components'
import { mdiChevronDown, mdiChevronUp } from '@mdi/js'
import Icon from '@mdi/react'

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
        <Icon path={mdiChevronUp} />
      </VoteButton>
      <p>{value}</p>
      <VoteButton displayType="down" onClick={onDecrement}>
        <Icon path={mdiChevronDown} />
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
`

const VoteButton = styled.button<{ displayType?: 'up' | 'down' }>`
  background-color: transparent;
  align-self: center;
  justify-self: center;
  border: none;
  width: 20px;
  height: 10px;
  transform: ${({ displayType }) =>
    displayType === 'up' ? 'translateY(-30%)' : 'translateY(-70%)'};
  cursor: pointer;
  transition: ease 0.1s;
  &:hover {
    transform: ${({ displayType }) =>
      displayType === 'up' ? 'translateY(-40%)' : 'translateY(-60%)'};
  }
  &:active {
    transform: ${({ displayType }) =>
      displayType === 'up' ? 'translateY(-50%)' : 'translateY(-50%)'};
  }
`
