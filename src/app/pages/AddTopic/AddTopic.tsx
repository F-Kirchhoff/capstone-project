import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import TopicForm from '../../components/TopicForm/TopicForm'
import useFetch from '../../hooks/useFetch'
import { BiChevronsLeft } from 'react-icons/bi'
import type { Board, Topic } from '../../types/types'

export default function AddTopic(): JSX.Element {
  const nav = useNavigate()
  const { boardName } = useParams()
  const [_board, fetchBoard] = useFetch<Board>(
    `/api/boards/${boardName}/addTopic`
  )

  async function handleTopicSubmit(topic: Topic) {
    await fetchBoard('POST', '/', JSON.stringify({ topic }))
    nav('..')
  }
  return (
    <AddTopicContainer>
      <ReturnButton to="..">
        <BiChevronsLeft size="32px" />
      </ReturnButton>
      <Header>Add Topic</Header>
      <TopicForm
        onSubmit={(newTopic: Topic) => {
          handleTopicSubmit(newTopic)
          nav('..')
        }}
        onCancel={() => nav('..')}
      ></TopicForm>
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
