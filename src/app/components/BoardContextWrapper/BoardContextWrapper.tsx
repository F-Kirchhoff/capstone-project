import React from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { BoardContext } from '../../App'

export default function BoardContextWrapper(): JSX.Element {
  const { boardName } = useParams()

  if (!boardName) {
    return <Navigate to="/me" />
  }

  return (
    <BoardContext.Provider value={boardName}>
      <Outlet />
    </BoardContext.Provider>
  )
}
