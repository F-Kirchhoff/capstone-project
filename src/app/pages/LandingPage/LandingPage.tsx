import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function LandingPage(): JSX.Element {
  const nav = useNavigate()

  const [isLoading, hasAccess] = useAuth('checkLogin')

  if (isLoading) {
    return <></>
  }

  if (hasAccess) {
    nav('/me')
  } else {
    nav('/login')
  }

  return <></>
}
