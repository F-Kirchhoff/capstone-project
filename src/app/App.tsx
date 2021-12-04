import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import TopicView from './pages/TopicView/TopicView'
import Dashboard from './pages/Dashboard/Dashboard'

import type { Need, Topic } from './types/types'
import type { ObjectId } from 'mongodb'
import AddTopic from './pages/AddTopic/AddTopic'
import useFetch from './hooks/useFetch'
import TopicHandler from './components/TopicHandler/TopicHandler'

type Board = {
  _id: ObjectId
  name: string
  topics: Topic[]
}

function App(): JSX.Element {
  const [board, fetchBoard] = useFetch<Board>('api/boards/exampleboard')

  useEffect(() => {
    fetchBoard('GET', '/')
  }, [])

  useEffect(() => {
    board && board.topics && setTopics(board.topics)
  }, [board])

  const [topics, setTopics] = useState<Topic[] | []>([])

  async function handleTopicSubmit(topic: Topic) {
    await fetchBoard('POST', '/', JSON.stringify({ topic }))
    fetchBoard('GET', '/')
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
