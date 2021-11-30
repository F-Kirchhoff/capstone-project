import React from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
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
      <ReturnButton to="/">
        <DoubleChevronLeft width={'24'} />
      </ReturnButton>
      <Header>Add Topic</Header>
      <TopicForm onSubmit={onSubmit} onCancel={() => nav('/')}></TopicForm>
    </AddTopicContainer>
  )
}

const AddTopicContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 1fr 1fr;
  background-color: var(--c-secondary);
`

const ReturnButton = styled(Link)`
  position: absolute;
  top: 30px;
  left: 30px;
  color: var(--c-gray-50);
  text-decoration: none;
  align-content: center;
`

const Header = styled.h1`
  display: flex;
  align-items: center;
  color: var(--c-gray-50);
  margin: 30px;
  align-self: stretch;
  font-size: 4rem;
`
