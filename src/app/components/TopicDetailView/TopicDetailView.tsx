import React from 'react'
import styled from 'styled-components'
import Countdown from '../Countdown/Countdown'

type Need = {
  upvotes: number
  content: string
}

type Topic = {
  title: string
  description: string
  needs: Need[]
  deadline: number
}

type TopicDetailViewProps = {
  content: Topic
}

function TopicDetailView({ content }: TopicDetailViewProps): JSX.Element {
  const { title, description, needs, deadline } = content
  return (
    <TopicContainer>
      <TitleContainer>
        <Countdown deadline={deadline} />
        <Title>{title}</Title>
      </TitleContainer>
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

const TitleContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const Title = styled.h1`
  font-family: 'Playfair';
  font-size: 1.5rem;
  font-weight: bold;
`

const Description = styled.p`
  color: var(--c-light);
`

const NeedsList = styled.ul`
  display: flex;
  flex-direction: column;
`
