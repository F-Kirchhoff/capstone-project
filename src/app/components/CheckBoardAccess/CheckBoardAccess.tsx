import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { BoardContext } from '../../App'

export default function CheckBoardAccess(): JSX.Element {
  const boardName = useContext(BoardContext)

  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)

  useEffect(() => {
    console.log('check Access for ' + boardName)

    async function checkAccess() {
      const res = await fetch('/api/auth/checkBoardAccess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ boardName }),
      })

      if (res.ok) {
        setHasAccess(true)
        setIsLoading(false)
      } else {
        setHasAccess(false)
        setIsLoading(false)
      }
    }
    checkAccess()
  }, [BoardContext])

  if (isLoading) {
    return <div>loading...</div>
  }

  if (!hasAccess) {
    return <Navigate to="/me" />
  }

  return <Outlet />
}
