import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'

import AddTopic from './pages/AddTopic/AddTopic'
import AddProposal from './pages/AddProposal/AddProposal'
import TopicView from './pages/TopicView/TopicView'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/boards/:boardName">
          <Route path="" element={<Dashboard />}></Route>
          <Route path="topics/:topicId">
            <Route path="" element={<TopicView />}></Route>
            <Route path="addproposal" element={<AddProposal />}></Route>
            <Route
              path="proposals/:proposalId"
              element={<ProposalView />}
            ></Route>
          </Route>
          <Route path="addTopic" element={<AddTopic />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
