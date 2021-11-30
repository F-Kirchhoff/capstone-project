import React from 'react'
import styled from 'styled-components'
import Need from '../Need/Need'
import type { Topic } from '../../types/types'
import ChevronUp from '../../Icons/ChevronUp'
import Button from '../Button/Button'

type TopicDetailViewProps = {
  content: Topic
  onCollapse: () => void
  onAddNeed: () => void
  onUpvoteChange: (needId: string) => (updatedVotes: number) => void
}

function TopicDetailView({
  content,
  onCollapse,
  onAddNeed,
  onUpvoteChange,
}: TopicDetailViewProps): JSX.Element {
  const { title, description, needs } = content

  return (
    <TopicContainer>
      <TitleContainer onClick={onCollapse}>
        <h2> {title}</h2> <ChevronUp width={'24'} />
      </TitleContainer>
      <Description>{description}</Description>
      <NeedsList>
        {needs.map(need => (
          <Need
            key={need.id}
            content={need}
            onUpvoteChange={onUpvoteChange(need.id)}
          />
        ))}
      </NeedsList>
      <Button highlight onClick={onAddNeed}>
        Add Need
      </Button>
    </TopicContainer>
  )
}

export default TopicDetailView

const TopicContainer = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const TitleContainer = styled.div`
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
