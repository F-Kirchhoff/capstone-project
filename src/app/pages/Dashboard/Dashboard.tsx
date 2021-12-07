import React, { useEffect } from 'react'
import styled from 'styled-components'

import Button from '../../components/Button/Button'
import Logo from '../../components/Logo/Logo'
import TopicCompactView from '../../components/TopicCompactView/TopicCompactView'

import type { Board } from '../../types/types'
import { useNavigate, useParams } from 'react-router'
import useFetch from '../../hooks/useFetch'

export default function Dashboard(): JSX.Element {
  const nav = useNavigate()

  const { boardName } = useParams()

  const [board, fetchBoard] = useFetch<Board>(`api/boards/${boardName}`)

  useEffect(() => {
    fetchBoard('GET', '/')
  }, [])

  const topics = board ? board.topics : []

  return (
    <DashboardContainer>
      <Navbar>
        <Logo />
        <Button highlight onClick={() => nav('/addtopic')}>
          + Topic
        </Button>
      </Navbar>
      <TopicContainer>
        <TopicList>
          {topics.map(topic => (
            <Card key={topic.id}>
              <TopicCompactView content={topic} />
            </Card>
          ))}
        </TopicList>
      </TopicContainer>
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
