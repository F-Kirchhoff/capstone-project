import React, { useState } from 'react'
import styled from 'styled-components'

import Button from '../Button/Button'
import Logo from '../Logo/Logo'
import TopicCompactView from '../TopicCompactView/TopicCompactView'
import TopicDetailView from '../TopicDetailView/TopicDetailView'
import TopicForm from '../TopicForm/TopicForm'

import type { Topic } from '../../types/types'

type DashboardProps = {
  content: {
    showDetails: boolean
    content: Topic
  }[]
  onDisplayToggle: (id: number) => void
  onTopicSubmit: (topic: Topic) => void
}

type DisplayMsgType = '' | 'SHOW_TOPIC_FORM'

export default function Dashboard({
  content,
  onDisplayToggle,
  onTopicSubmit,
}: DashboardProps): JSX.Element {
  const [displayState, setDisplayState] = useState<DisplayMsgType>('')

  function handleSubmit(topic: Topic) {
    setDisplayState('')
    onTopicSubmit(topic)
  }

  return (
    <DashboardContainer>
      <Navbar>
        <Logo />
        <Button highlight onClick={() => setDisplayState('SHOW_TOPIC_FORM')}>
          + Topic
        </Button>
      </Navbar>
      <TopicContainer>
        <TopicList>
          {content.map((topic) => (
            <Card key={topic.content.id}>
              {topic.showDetails ? (
                <TopicDetailView
                  content={topic.content}
                  onCollapse={() => onDisplayToggle(topic.content.id)}
                />
              ) : (
                <TopicCompactView
                  content={topic.content}
                  onExpand={() => onDisplayToggle(topic.content.id)}
                />
              )}
            </Card>
          ))}
        </TopicList>
      </TopicContainer>
      {displayState === 'SHOW_TOPIC_FORM' && (
        <TopicForm
          onSubmit={handleSubmit}
          onCancel={() => setDisplayState('')}
        />
      )}
    </DashboardContainer>
  )
}

const DashboardContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: auto 1fr;
`

const TopicContainer = styled.div`
  background-color: var(--c-gray-100);
  overflow-y: auto;
`

const TopicList = styled.ul`
  display: grid;
  gap: 15px;
  padding: 15px;
`

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: var(--c-gray-50);
  z-index: 10;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`
const Card = styled.li`
  padding: 20px;
  background-color: var(--c-gray-50);
  border-radius: 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`
