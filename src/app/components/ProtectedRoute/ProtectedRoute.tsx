import React from 'react'

import { Route } from 'react-router-dom'
import type { RouteProps } from 'react-router-dom'

export type ProtectedRouteProps = {
  isAuthenticated: boolean
  authenticationPath: string
} & RouteProps

export default function ProtectedRoute({
  isAuthenticated,
  ...routeProps
}: ProtectedRouteProps): JSX.Element {
  if (!isAuthenticated) {
    return <div>404 Page not found.</div>
  } else {
    return <Route {...routeProps} />
  }
}
