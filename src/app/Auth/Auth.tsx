import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function Auth({ method }: { method: string }): JSX.Element {
  const [isLoading, hasAccess] = useAuth(method)

  if (isLoading) {
    return <div>loading...</div>
  }

  if (!hasAccess) {
    return <Navigate to="/" />
  }

  return <Outlet />
}
