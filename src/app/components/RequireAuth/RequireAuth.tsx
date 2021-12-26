import React from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'

export default function RequireAuth(): JSX.Element {
  const { boardName } = useParams()

  console.log(boardName)

  const hasAccessRights = false

  if (!hasAccessRights) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}
