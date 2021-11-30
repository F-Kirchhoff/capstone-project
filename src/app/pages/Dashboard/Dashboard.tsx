import React, { useState } from 'react'
import styled from 'styled-components'

import Button from '../../components/Button/Button'
import FormWrapper from '../../components/FormWrapper/FormWrapper'
import Logo from '../../components/Logo/Logo'
import TopicCompactView from '../../components/TopicCompactView/TopicCompactView'
import TopicForm from '../../components/TopicForm/TopicForm'

import type { Topic } from '../../types/types'

type DashboardProps = {
  content: Topic[]
  onTopicSubmit: (topic: Topic) => void
}

type DisplayMsgType = '' | 'SHOW_TOPIC_FORM'

export default function Dashboard({
  content,
  onTopicSubmit,
}: DashboardProps): JSX.Element {
  const [displayState, setDisplayState] = useState<DisplayMsgType>('')
  function handleTopicSubmit(topic: Topic) {
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
          {content.map(topic => (
            <Card key={topic.id}>
              <TopicCompactView content={topic} />
            </Card>
          ))}
        </TopicList>
      </TopicContainer>
      {displayState === 'SHOW_TOPIC_FORM' && (
        <FormWrapper
          onReturn={() => {
            setDisplayState('')
          }}
        >
          <TopicForm
            onSubmit={handleTopicSubmit}
            onCancel={() => setDisplayState('')}
          />
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
// const FormWrapper = styled.div`
//   z-index: 1000;
//   position: absolute;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
// `
// const FormBackground = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   background-color: rgba(0, 0, 0, 0.7);
// `
