import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import TopicView from './pages/TopicView/TopicView'
import Dashboard from './pages/Dashboard/Dashboard'

import type { Need, Topic } from './types/types'
import type { ObjectId } from 'mongodb'
import AddTopic from './pages/AddTopic/AddTopic'
import useFetch from './hooks/useFetch'

const TOPICS = [
  {
    id: '0',
    title: 'Annual income for employees',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa, laborum. Molestias sint dicta, amet nemo vero enim pariatur ipsa maxime illo possimus repellendus fugiat modi odio consequatur maiores architecto natus dolorem eum quisquam dolor dolores, ut voluptatibus labore! Itaque officia quidem porro mollitia, deleniti voluptates! Minima cum aliquid minus provident?',
    needs: [
      {
        id: '1',
        text: 'sit amet consectetur adipisicing elit.',
        upvotes: 57,
      },
      {
        id: '2',
        text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
        upvotes: 19,
      },
      {
        id: '3',
        text: ' Maiores, veniam.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        upvotes: 2,
      },
    ],
  },
  {
    id: '1',
    title: 'New Logo Design',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa, laborum. Molestias sint dicta, amet nemo vero enim pariatur.',
    needs: [
      {
        id: '1',
        text: 'sit amet consectetur adipisicing elit.',
        upvotes: 57,
      },
      {
        id: '2',
        text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
        upvotes: 19,
      },
      {
        id: '3',
        text: ' Maiores, veniam.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        upvotes: 2,
      },
    ],
  },
  {
    id: '2',
    title: 'Friday Night Activity',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa, laborum. Molestias sint dicta, amet nemo vero enim pariatur ipsa maxime illo possimus repellendus fugiat modi odio consequatur maiores architecto natus dolorem eum quisquam dolor dolores, ut voluptatibus labore! Itaque officia quidem porro mollitia, deleniti voluptates! Minima cum aliquid minus provident?',
    needs: [
      {
        id: '1',
        text: 'sit amet consectetur adipisicing elit.',
        upvotes: 57,
      },
      {
        id: '2',
        text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
        upvotes: 19,
      },
      {
        id: '3',
        text: ' Maiores, veniam.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        upvotes: 2,
      },
    ],
  },
]

type Board = {
  _id: ObjectId
  name: string
  topics: Topic[]
}

function App(): JSX.Element {
  const board = useFetch<Board>('GET', 'api/boards/exampleboard')

  console.log(board)

  const [topics, setTopics] = useState(TOPICS)

  function handleTopicSubmit(topic: Topic) {
    setTopics(prev => [topic, ...prev])
  }

  const handleNeedSubmit = (topicId: string) => (newNeed: Need) => {
    // finds the correct topic and adds a need on top of its needList
    setTopics(prev => {
      const queriedTopic = prev.find(topic => topic.id === topicId)
      if (!queriedTopic) return prev

      const updatedTopic = {
        ...queriedTopic,
        needs: [...queriedTopic.needs, newNeed],
      }

      return prev.map(topic => (topic.id === topicId ? updatedTopic : topic))
    })
  }

  const handleNeedUpvote =
    (topicId: string) => (needId: string) => (newUpvotes: number) => {
      // finds the relevant Topic, inside it finds the relevant need and updates it upvote count

      setTopics(prev => {
        const queriedTopic = prev.find(topic => topic.id === topicId)
        if (!queriedTopic) return prev

        const queriedNeed = queriedTopic.needs.find(need => need.id === needId)
        if (!queriedNeed) return prev

        const updatedNeed = {
          ...queriedNeed,
          upvotes: newUpvotes,
        }

        const resortedNeeds = queriedTopic.needs
          .map(need => (need.id === needId ? updatedNeed : need))
          .sort((a, b) => b.upvotes - a.upvotes)

        const updatedTopic = {
          ...queriedTopic,
          needs: resortedNeeds,
        }

        return prev.map(topic => (topic.id === topicId ? updatedTopic : topic))
      })
    }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard content={topics} />}></Route>
        <Route
          path="/:topicId"
          element={
            <TopicHandler
              topics={topics}
              onNeedSubmit={handleNeedSubmit}
              onNeedUpvote={handleNeedUpvote}
            />
          }
        ></Route>
        <Route
          path="/addTopic"
          element={<AddTopic onSubmit={handleTopicSubmit} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

type TopicHandlerProps = {
  topics: Topic[]
  onNeedUpvote: (
    topicId: string
  ) => (needId: string) => (updatedVotes: number) => void
  onNeedSubmit: (topicId: string) => (need: Need) => void
}

function TopicHandler({
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
