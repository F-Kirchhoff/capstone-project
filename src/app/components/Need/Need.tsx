import React from 'react'
import styled from 'styled-components'
import type { Need as NeedType } from '../../types/types'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import EditMenu from '../EditMenu/EditMenu'

type NeedProps = {
  content: NeedType
  toggleUpvote: (id: string) => () => void
  onEdit: () => void
  onDelete: () => void
  user: string
}

export default function Need({
  content,
  onEdit,
  onDelete,
  toggleUpvote,
  user,
}: NeedProps): JSX.Element {
  const { id, text, upvotes } = content

  const isUpvoted = upvotes.includes(user)

  return (
    <Container>
      <EditMenu onEdit={onEdit} onDelete={onDelete} />
      <NeedContainer>
        <UpvoteButton onClick={toggleUpvote(id)} isUpvoted={isUpvoted}>
          {isUpvoted ? (
            <FaHeart size="18px" color="inherit" />
          ) : (
            <FaRegHeart size="18px" color="inherit" />
          )}
          <span>{upvotes.length}</span>
        </UpvoteButton>
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
const UpvoteButton = styled.button<{ isUpvoted: boolean }>`
  color: ${({ isUpvoted }) =>
    isUpvoted ? 'var(--c-primary)' : 'rgb(0 0 0 / 70%)'};
  background-color: transparent;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 3px 8px;
  border: none;
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`
