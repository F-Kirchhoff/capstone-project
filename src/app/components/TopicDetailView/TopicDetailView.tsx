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
  background-color: var(--c-primary);
  padding: 15px;
  border-radius: 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`

const Title = styled.h1`
  font-family: 'Playfair';
  font-size: 1.5rem;
  font-weight: bold;
`

const Description = styled.p`
  color: var(--c-light);
  padding: 0 10px 10px;
`

const NeedsList = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: var(--c-primary-70);
  gap: 1px;
`
