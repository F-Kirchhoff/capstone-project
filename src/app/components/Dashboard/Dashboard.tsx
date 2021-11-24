import React from 'react'
import styled from 'styled-components'

import type { Topic } from '../../types/types'
import Logo from '../Logo/Logo'
import TopicCompactView from '../TopicCompactView/TopicCompactView'
import TopicDetailView from '../TopicDetailView/TopicDetailView'

type DashboardProps = {
  content: [
    {
      showDetails: boolean
      content: Topic
    }
  ]
}

export default function Dashboard({ content }: DashboardProps): JSX.Element {
  return (
    <DashboardContainer>
      <Navbar>
        <Logo />
      </Navbar>
      <TopicContainer>
        <TopicList>
          {content.map((topic) =>
            topic.showDetails ? (
              <TopicDetailView key={topic.content.id} content={topic.content} />
            ) : (
              <TopicCompactView
                key={topic.content.id}
                content={topic.content}
              />
            )
          )}
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
