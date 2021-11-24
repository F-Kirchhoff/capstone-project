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
  font-family: 'Plairfair';
  font-weight: bold;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`
