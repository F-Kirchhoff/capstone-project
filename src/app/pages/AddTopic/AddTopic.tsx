import React from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import TopicForm from '../../components/TopicForm/TopicForm'
import DoubleChevronLeft from '../../Icons/DoubleChevronLeft'
import type { Topic } from '../../types/types'

type AddTopicProps = {
  onSubmit: (topic: Topic) => void
}

export default function AddTopic({ onSubmit }: AddTopicProps): JSX.Element {
  const nav = useNavigate()
  return (
    <AddTopicContainer>
      <HeaderContainer>
        <DoubleChevronLeft width={'24'} />
        <h1>Add Topic</h1>
      </HeaderContainer>
      <TopicForm onSubmit={onSubmit} onCancel={() => nav('/')}></TopicForm>
    </AddTopicContainer>
  )
}

const AddTopicContainer = styled.div``

const HeaderContainer = styled.div``
