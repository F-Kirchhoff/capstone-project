import React, { useState } from 'react'
import styled from 'styled-components'

import Button from '../Button/Button'
import Logo from '../Logo/Logo'
import TopicCompactView from '../TopicCompactView/TopicCompactView'
import TopicDetailView from '../TopicDetailView/TopicDetailView'
import TopicForm from '../TopicForm/TopicForm'

import type { Topic, Need } from '../../types/types'
import NeedForm from '../NeedForm/NeedForm'

type DashboardProps = {
  content: {
    showDetails: boolean
    content: Topic
  }[]
  onDisplayToggle: (id: string) => void
  onTopicSubmit: (topic: Topic) => void
  onNeedSubmit: (id: string, need: Need) => void
}

type DisplayMsgType = '' | 'SHOW_TOPIC_FORM' | 'SHOW_NEED_FORM'

export default function Dashboard({
  content,
  onDisplayToggle,
  onTopicSubmit,
  onNeedSubmit,
}: DashboardProps): JSX.Element {
  const [displayState, setDisplayState] = useState<DisplayMsgType>('')
  const [topicFocusId, setTopicFocusId] = useState<string | null>(null)
  function handleTopicSubmit(topic: Topic) {
    setDisplayState('')
    onTopicSubmit(topic)
  }
  function handleNeedSubmit(need: Need) {
    // resets the Display state and if topicFocus is set, a new need is added in app.tsx
    setDisplayState('')
    topicFocusId && onNeedSubmit(topicFocusId, need)
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
          {content.map(topic => (
            <Card key={topic.content.id}>
              {topic.showDetails ? (
                <TopicDetailView
                  content={topic.content}
                  onCollapse={() => onDisplayToggle(topic.content.id)}
                  onAddNeed={() => {
                    // on a Click on the Add need button the TopicFocus is set to the respective Topic id and the need Form is displayed
                    setTopicFocusId(topic.content.id)
                    setDisplayState('SHOW_NEED_FORM')
                  }}
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
      {displayState !== '' && (
        <FormWrapper>
          <FormBackground
            onClick={() => {
              setTopicFocusId(null)
              setDisplayState('')
            }}
          />
          {displayState === 'SHOW_TOPIC_FORM' ? (
            <TopicForm
              onSubmit={handleTopicSubmit}
              onCancel={() => setDisplayState('')}
            />
          ) : (
            <NeedForm
              onSubmit={handleNeedSubmit}
              onCancel={() => {
                setTopicFocusId(null)
                setDisplayState('')
              }}
            />
          )}
        </FormWrapper>
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
  display: flex;
  flex-direction: column;
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
  word-wrap: break-word;
`
const FormWrapper = styled.div`
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`
const FormBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
`
