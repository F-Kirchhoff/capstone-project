import React from 'react'
import styled from 'styled-components'
import type { Topic } from '../../types/types'

type TopicCompactViewProps = {
  content: Topic
}

export default function TopicCompactView({
  content,
}: TopicCompactViewProps): JSX.Element {
  return <TopicCompact>{content.title}</TopicCompact>
}

const TopicCompact = styled.h2`
  color: var(--c-primary);
  font-family: 'Plairfair';
  font-weight: bold;
`
