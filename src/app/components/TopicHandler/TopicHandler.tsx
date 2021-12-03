import React from 'react'
import { useParams } from 'react-router-dom'
import TopicView from '../../pages/TopicView/TopicView'

import type { Topic, Need } from '../../types/types'

type TopicHandlerProps = {
  topics: Topic[]
  onNeedUpvote: (
    topicId: string
  ) => (needId: string) => (updatedVotes: number) => void
  onNeedSubmit: (topicId: string) => (need: Need) => void
}

export default function TopicHandler({
  topics,
  onNeedUpvote,
  onNeedSubmit,
}: TopicHandlerProps): JSX.Element {
  const params = useParams()
  const topic = topics.find(topic => topic.id === params.topicId)
  return topic ? (
    <TopicView
      onUpvoteChange={onNeedUpvote(topic.id)}
      onNeedSubmit={onNeedSubmit(topic.id)}
      content={topic}
    />
  ) : (
    <h1>404 Page not found</h1>
  )
}
