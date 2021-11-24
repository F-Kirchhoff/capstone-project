import React from 'react'
import styled from 'styled-components'
import Need from '../Need/Need'
import type { Topic } from '../../types/types'

type TopicDetailViewProps = {
  content: Topic
}

function TopicDetailView({ content }: TopicDetailViewProps): JSX.Element {
  const { title, description, needs } = content
  return (
    <TopicContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <NeedsList>
        {needs.map((need) => (
          <Need key={need.id} content={need} />
        ))}
      </NeedsList>
    </TopicContainer>
  )
}

export default TopicDetailView

const TopicContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Title = styled.h1`
  font-family: 'Playfair';
  color: var(--c-primary);
  font-size: 1.5rem;
  font-weight: bold;
`

const Description = styled.p`
  color: var(--c-gray-600);
`

const NeedsList = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: var(--c-gray-200);
  gap: 1px;
  padding: 1px 0;
`
