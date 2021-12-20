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
        <UpvoteButton onClick={toggleUpvote(id)}>
          <>
            <svg width="0" height="0">
              <linearGradient
                id="mygradient"
                x1="100%"
                y1="100%"
                x2="0%"
                y2="0%"
              >
                <stop stopColor="var(--g-hl-start)" offset="0%" />
                <stop stopColor="var(--g-hl-mid)" offset="50%" />
                <stop stopColor="var(--g-hl-end)" offset="100%" />
              </linearGradient>
            </svg>
            {isUpvoted ? (
              <FaHeart size="18px" color="inherit" fill="url(#mygradient)" />
            ) : (
              <FaRegHeart size="18px" color="inherit" />
            )}
          </>
          <Counter>{upvotes.length}</Counter>
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
const UpvoteButton = styled.button`
  color: rgb(0 0 0 / 70%);
  background-color: transparent;
  font-size: 0.7rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  display: grid;
  gap: 2px;
  justify-items: center;
  align-content: center;
`

const Counter = styled.span`
  background-color: var(--c-gray-100);
  min-width: 30px;
  padding: 1px 2px;
  border-radius: 5px;
`
