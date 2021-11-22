import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<p>'hi!'</p>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
