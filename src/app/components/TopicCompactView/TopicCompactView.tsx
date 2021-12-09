import React from 'react'
import styled from 'styled-components'
import type { Topic } from '../../types/types'
import { Link } from 'react-router-dom'
import { BiChevronsRight } from 'react-icons/bi'

type TopicCompactViewProps = {
  content: Topic
}

export default function TopicCompactView({
  content,
}: TopicCompactViewProps): JSX.Element {
  return (
    <TopicCompact to={`topics/${content.id}`}>
      <h2>{content.title}</h2>
      <BiChevronsRight size="32px" />
    </TopicCompact>
  )
}

const TopicCompact = styled(Link)`
  color: var(--c-primary);
  font-family: 'Plairfair';
  font-weight: bold;
  text-decoration: none;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  cursor: pointer;
  & > h2 {
    overflow: hidden;
  }
`
