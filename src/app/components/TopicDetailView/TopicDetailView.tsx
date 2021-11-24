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
  background-color: var(--c-gray-50);
  padding-top: 20px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`

const Title = styled.h1`
  font-family: 'Playfair';
  color: var(--c-primary);
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0 20px;
`

const Description = styled.p`
  color: var(--c-gray-600);
  padding: 0 20px;
`

const NeedsList = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: var(--c-gray-200);
  gap: 1px;
  padding-top: 1px;
`
