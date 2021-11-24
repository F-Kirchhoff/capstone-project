import React from 'react'
import styled from 'styled-components'
import type { Topic } from '../../types/types'

type TopicCompactViewProps = {
  content: Topic
}

export default function TopicCompactView({
  content,
}: TopicCompactViewProps): JSX.Element {
  return (
    <TopicCompact>
      <h2>{content.title}</h2>
    </TopicCompact>
  )
}

const TopicCompact = styled.li`
  padding: 20px;
  background-color: var(--c-gray-50);
  color: var(--c-primary);
  border-radius: 15px;
`
