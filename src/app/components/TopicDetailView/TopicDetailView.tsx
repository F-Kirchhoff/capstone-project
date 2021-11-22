import React from 'react'
import styled from 'styled-components'
import Countdown from '../Countdown/Countdown'
import Need from '../Need/Need'

type Need = {
  upvotes: number
  text: string
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
          <Need content={need} isUpvoted={false} />
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
  overflow: hidden;
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
  padding: 0 10px 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`

const NeedsList = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: var(--c-primary-70);
  gap: 1px;
`
