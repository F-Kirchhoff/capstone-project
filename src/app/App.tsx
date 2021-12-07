import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'

import type { Need, Topic, Board } from './types/types'

import AddTopic from './pages/AddTopic/AddTopic'
import useFetch from './hooks/useFetch'
import TopicHandler from './components/TopicHandler/TopicHandler'
import AddProposal from './pages/AddProposal/AddProposal'
import TopicView from './pages/TopicView/TopicView'

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/boards/:boardName">
          <Route path="" element={<Dashboard />}></Route>
          <Route path="topics/:topicId" element={<TopicView />}></Route>
          <Route
            path=":topicId/addproposal"
            element={
              <AddProposal
                topics={topics}
                onSubmit={() => console.log('It Works!')}
              />
            }
          ></Route>
          <Route
            path="addTopic"
            element={<AddTopic onSubmit={handleTopicSubmit} />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
