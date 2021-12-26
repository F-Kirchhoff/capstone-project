import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function CheckBoardAccess(): JSX.Element {
  const [isLoading, hasAccess] = useAuth('checkBoardAccess')

  if (isLoading) {
    return <div>loading...</div>
  }

  if (!hasAccess) {
    return <Navigate to="/me" />
  }

  return <Outlet />
}
