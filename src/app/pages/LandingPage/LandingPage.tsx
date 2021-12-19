import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage(): JSX.Element {
  const nav = useNavigate()

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch('/api/auth')
      if (res.ok) {
        nav('/me')
      } else {
        nav('/login')
      }
    }
    checkAuth()
  }, [])

  return <></>
}
