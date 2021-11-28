import React from 'react'
import styled from 'styled-components'
import type { Need as NeedType } from '../../types/types'
import Counter from '../Counter/Counter'

type NeedProps = {
  content: NeedType
}

export default function Need({ content }: NeedProps): JSX.Element {
  const { text, upvotes } = content

  const handleUpvoteChange = (delta: number) => () => {
    console.log(upvotes + delta)
  }

  return (
    <NeedContainer>
      <Counter
        value={upvotes}
        onIncrement={handleUpvoteChange(1)}
        onDecrement={handleUpvoteChange(-1)}
      />
      <p>{text}</p>
    </NeedContainer>
  )
}

const NeedContainer = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 10px;
  padding: 10px 20px;
  background-color: var(--c-gray-50);
  & > p {
    align-self: center;
  }
`
