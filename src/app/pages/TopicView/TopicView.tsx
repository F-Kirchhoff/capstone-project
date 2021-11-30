import React from 'react'
import styled from 'styled-components'
import Need from '../../components/Need/Need'
import type { Topic, Need as NeedType } from '../../types/types'
import Button from '../../components/Button/Button'
import DoubleChevronLeft from '../../Icons/DoubleChevronLeft'
import { Link } from 'react-router-dom'

type TopicDetailViewProps = {
  content: Topic
  onNeedSubmit: (need: NeedType) => void
  onUpvoteChange: (needId: string) => (updatedVotes: number) => void
}

function TopicView({
  content,
  onNeedSubmit,
  onUpvoteChange,
}: TopicDetailViewProps): JSX.Element {
  const { title, description, needs } = content

  return (
    <TopicContainer>
      <TitleContainer to={'/'}>
        <DoubleChevronLeft width="24" /> <h2> {title}</h2>
      </TitleContainer>
      <Description>{description}</Description>
      <h3>Needs</h3>
      <NeedsList>
        {needs.map(need => (
          <Need
            key={need.id}
            content={need}
            onUpvoteChange={onUpvoteChange(need.id)}
          />
        ))}
      </NeedsList>
      <Button highlight onClick={() => console.log('Enter Need Form')}>
        Add Need
      </Button>
    </TopicContainer>
  )
}

export default TopicView

const TopicContainer = styled.article`
  width: 100vw;
  height: 100vh;
  background-color: var(--c-gray-100);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const TitleContainer = styled(Link)`
  text-decoration: none;
  color: var(--c-primary);
  font-family: 'Plairfair';
  font-weight: bold;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
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
  border-radius: 15px;
  overflow: hidden;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`
