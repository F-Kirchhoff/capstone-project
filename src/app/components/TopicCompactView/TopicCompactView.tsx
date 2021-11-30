import React from 'react'
import styled from 'styled-components'
import type { Topic } from '../../types/types'
import DoubleChevronRight from '../../Icons/DoubleChevronRight'
import { Link } from 'react-router-dom'

type TopicCompactViewProps = {
  content: Topic
}

export default function TopicCompactView({
  content,
}: TopicCompactViewProps): JSX.Element {
  return (
    <TopicCompact to={`/${content.id}`}>
      <h2>{content.title}</h2>
      <DoubleChevronRight width={'24'} />
    </TopicCompact>
  )
}

const TopicCompact = styled(Link)`
  color: var(--c-primary);
  font-family: 'Plairfair';
  font-weight: bold;
  text-decoration: none;
  display: grid;
  grid-template-columns: 1fr auto;
  cursor: pointer;
  & > h2 {
    overflow: hidden;
  }
`
