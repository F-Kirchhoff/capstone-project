import React from 'react'
import styled from 'styled-components'

import type { Topic } from '../../types/types'
import Logo from '../Logo/Logo'
import TopicDetailView from '../TopicDetailView/TopicDetailView'

type DashboardProps = {
  content: Topic[]
}

export default function Dashboard({ content }: DashboardProps): JSX.Element {
  return (
    <DashboardContainer>
      <Navbar>
        <Logo />
      </Navbar>
      <TopicContainer>
        <TopicList>
          {content.map((topic) => (
            <TopicDetailView key={topic.id} content={topic} />
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

const TopicList = styled.ul`
  overflow-y: auto;
  padding: 10px;
  display: grid;
  align-content: start;
  gap: 15px;
`

const TopicContainer = styled.div`
  padding: 15px;
`

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`
