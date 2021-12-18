import React from 'react'
import styled from 'styled-components'
import type { Need as NeedType } from '../../types/types'
import Counter from '../Counter/Counter'
import EditMenu from '../EditMenu/EditMenu'

type NeedProps = {
  content: NeedType
  onUpvoteChange: (updatedVotes: number) => void
  onEdit: () => void
  onDelete: () => void
}

export default function Need({
  content,
  onUpvoteChange,
  onEdit,
  onDelete,
}: NeedProps): JSX.Element {
  const { text, upvotes } = content

  const handleUpvoteChange = (delta: number) => () => {
    upvotes + delta >= 1 && onUpvoteChange(upvotes + delta)
  }

  return (
    <Container>
      <EditMenu onEdit={onEdit} onDelete={onDelete} />
      <NeedContainer>
        <Counter
          value={upvotes}
          onIncrement={handleUpvoteChange(1)}
          onDecrement={handleUpvoteChange(-1)}
        />
        <p>{text}</p>
      </NeedContainer>
    </Container>
  )
}

const Container = styled.li`
  background-color: var(--c-gray-50);
  display: flex;
  flex-direction: column;
  padding: 5px;
  & > *:first-child {
    height: 4px;
    align-self: flex-end;
    top: 5px;
    right: 5px;
  }
`

const NeedContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 10px;
  padding: 10px 10px;
  & > p {
    align-self: center;
  }
`
