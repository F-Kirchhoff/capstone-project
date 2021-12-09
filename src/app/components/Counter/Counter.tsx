import React from 'react'
import styled from 'styled-components'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'

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
        <FaChevronUp />
      </VoteButton>
      <p>{value}</p>
      <VoteButton displayType="down" onClick={onDecrement}>
        <FaChevronDown />
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
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  height: 8px;
  cursor: pointer;
  transition: ease 0.1s;
  &:hover {
    transform: ${({ displayType }) =>
      displayType === 'up' ? 'translateY(-10%)' : 'translateY(10%)'};
  }
  &:active {
    transform: ${({ displayType }) =>
      displayType === 'up' ? 'translateY(-30%)' : 'translateY(30%)'};
  }
`
