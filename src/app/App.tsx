import React, { useState } from 'react'
import logo from './logo.svg'
import styles from './App.module.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
