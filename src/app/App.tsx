import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'

import AddTopic from './pages/AddTopic/AddTopic'
import AddProposal from './pages/AddProposal/AddProposal'
import TopicView from './pages/TopicView/TopicView'
import LoginView from './pages/LoginView/LoginView'
import ProfileView from './pages/ProfileView/ProfileView'
import AddBoard from './pages/AddBoard/AddBoard'
import EditBoard from './pages/EditBoard/EditBoard'
import LandingPage from './pages/LandingPage/LandingPage'
import Auth from './Auth/Auth'
import BoardContextWrapper from './components/BoardContextWrapper/BoardContextWrapper'

export const BoardContext = React.createContext<string | null>(null)

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginView tab="login" />} />
        <Route path="/register" element={<LoginView tab="register" />} />
        <Route path="/me" element={<Auth method="checkLogin" />}>
          <Route path="" element={<ProfileView />} />
        </Route>
        <Route path="/addBoard" element={<AddBoard />} />
        <Route path="/boards/:boardName" element={<BoardContextWrapper />}>
          <Route path="" element={<Auth method="checkBoardAccess" />}>
            <Route path="" element={<Dashboard />} />
            <Route path="edit" element={<EditBoard />}></Route>
            <Route path="topics/:topicId">
              <Route path="" element={<TopicView />} />
              <Route path="addProposal" element={<AddProposal />} />
            </Route>
            <Route path="addTopic" element={<AddTopic />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
