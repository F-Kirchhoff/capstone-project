import React from 'react'
import styled from 'styled-components'

import type { Topic } from '../../types/types'
import TopicDetailView from '../TopicDetailView/TopicDetailView'

type DashboardProps = {
  content: Topic[]
}

export default function Dashboard({ content }: DashboardProps): JSX.Element {
  return (
    <DashboardContainer>
      <div>D'Artagnan</div>
      <TopicList>
        {content.map((topic) => (
          <TopicDetailView key={topic.id} content={topic} />
        ))}
      </TopicList>
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
  display: flex;
  flex-direction: column;
  gap: 10px;
`
