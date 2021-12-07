import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'

import type { Need, Topic, Board } from './types/types'

import AddTopic from './pages/AddTopic/AddTopic'
import useFetch from './hooks/useFetch'
import TopicHandler from './components/TopicHandler/TopicHandler'

function App(): JSX.Element {
  const [board, fetchBoard] = useFetch<Board>('api/boards/exampleboard')
  const topics = board ? board.topics : []
  useEffect(() => {
    fetchBoard('GET', '/')
  }, [])

  async function handleTopicSubmit(topic: Topic) {
    await fetchBoard('POST', '/', JSON.stringify({ topic }))
    fetchBoard('GET', '/')
  }

  const handleNeedSubmit = (topicId: string) => async (newNeed: Need) => {
    // finds the correct topic and adds a need
    await fetchBoard(
      'POST',
      `/topics/${topicId}/addNeed`,
      JSON.stringify({ newNeed })
    )
    fetchBoard('GET', '/')
  }

  const handleNeedUpvote =
    (topicId: string) => (needId: string) => async (upvotes: number) => {
      // finds the relevant Topic, inside it finds the relevant need and updates it upvote count
      await fetchBoard(
        'PATCH',
        `/topics/${topicId}/needs/${needId}`,
        JSON.stringify({ patchMsg: 'UPVOTES', payload: upvotes })
      )
      fetchBoard('GET', '/')
    }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:boardName" element={<Dashboard />}></Route>
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
