import React from 'react'
import styled from 'styled-components'
import type { Topic } from '../../types/types'
import ChevronDown from '../../Icons/ChevronDown'

type TopicCompactViewProps = {
  content: Topic
}

export default function TopicCompactView({
  content,
}: TopicCompactViewProps): JSX.Element {
  return (
    <TopicCompact>
      <h2>{content.title}</h2>
      <ChevronDown />
    </TopicCompact>
  )
}

const TopicCompact = styled.div`
  color: var(--c-primary);
  font-family: 'Plairfair';
  font-weight: bold;
  display: grid;
  grid-template-columns: 1fr auto;
`
