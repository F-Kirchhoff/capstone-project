import { useContext, useEffect, useState } from 'react'
import { BoardContext } from '../App'

export default function useAuth(endpoint: string): [boolean, boolean | null] {
  const boardName = useContext(BoardContext)

  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)

  useEffect(() => {
    async function checkAccess() {
      const res = await fetch(`/api/auth/${endpoint}`, {
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

  return [isLoading, hasAccess]
}
