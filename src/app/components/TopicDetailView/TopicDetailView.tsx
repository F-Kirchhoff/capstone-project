import React from 'react'
import styled from 'styled-components'

type Need = {
  upvotes: number
  content: string
}

type Topic = {
  title: string
  description: string
  needs: Need[]
  deadline: string
}

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
          <li>{`${need.upvotes} ${need.content}`}</li>
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
  padding: 10px;
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`

const Description = styled.p``

const NeedsList = styled.ul`
  display: flex;
  flex-direction: column;
`
