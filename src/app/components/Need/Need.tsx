import React from 'react'
import styled from 'styled-components'
import type { Need as NeedType } from '../../types/types'
import Counter from '../Counter/Counter'
import EditMenu from '../EditMenu/EditMenu'

type NeedProps = {
  content: NeedType
  onUpvoteChange: (updatedVotes: number) => void
}

export default function Need({
  content,
  onUpvoteChange,
}: NeedProps): JSX.Element {
  const { text, upvotes } = content

  const handleUpvoteChange = (delta: number) => () => {
    upvotes + delta >= 1 && onUpvoteChange(upvotes + delta)
  }

  return (
    <NeedContainer>
      <Counter
        value={upvotes}
        onIncrement={handleUpvoteChange(1)}
        onDecrement={handleUpvoteChange(-1)}
      />
      <p>{text}</p>
      <EditMenu
        onEdit={() => console.log('Enter Edit')}
        onDelete={() => console.log('Enter Delete')}
      />
    </NeedContainer>
  )
}

const NeedContainer = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  column-gap: 10px;
  padding: 10px 10px;
  background-color: var(--c-gray-50);
  & > p {
    align-self: center;
  }
`
