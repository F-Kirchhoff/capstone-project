import React from 'react'
import styled from 'styled-components'

type Need = {
  upvotes: number
  text: string
}

type NeedProps = {
  content: Need
  isUpvoted: boolean
}

export default function Need({ content, isUpvoted }: NeedProps): JSX.Element {
  const { text, upvotes } = content
  return (
    <NeedContainer>
      <Upvotes>{`${isUpvoted ? '-' : '+'} ${upvotes}`}</Upvotes>
      <p>{text}</p>
    </NeedContainer>
  )
}

const NeedContainer = styled.li`
  display: grid;
  grid-template-columns: 3rem 1fr;
  align-items: start;
  gap: 10px;
`

const Upvotes = styled.button`
  border: none;
  color: var(--c-light);
  background-color: transparent;
  font-weight: bold;
  font-size: 1rem;
  padding: 0 5px;
  border-radius: 999px;
`
