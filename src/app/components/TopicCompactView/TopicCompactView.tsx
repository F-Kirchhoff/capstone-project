import React from 'react'
import styled from 'styled-components'
import type { Topic } from '../../types/types'
import ChevronDown from '../../Icons/ChevronDown'

type TopicCompactViewProps = {
  content: Topic
  onExpand: () => void
}

export default function TopicCompactView({
  content,
  onExpand,
}: TopicCompactViewProps): JSX.Element {
  return (
    <TopicCompact onClick={onExpand}>
      <h2>{content.title}</h2>
      <ChevronDown width={'24'} />
    </TopicCompact>
  )
}

const TopicCompact = styled.div`
  color: var(--c-primary);
  font-family: 'Plairfair';
  font-weight: bold;
  display: grid;
  grid-template-columns: 1fr auto;
  cursor: pointer;
  & > h2 {
    overflow: hidden;
  }
`
