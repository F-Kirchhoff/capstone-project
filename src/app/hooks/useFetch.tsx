import { useState } from 'react'
import type { fetchBody } from '../types/types'

type useFetchReturnType<Type> = [
  Type | null,
  (method: string, bodyAdditions?: fetchBody) => Promise<void>
]

function useFetch<Type>(
  url: string,
  baseBody: fetchBody = {}
): useFetchReturnType<Type> {
  const [data, setData] = useState(null)

  async function fetchData(method: string, bodyAdditions: fetchBody = {}) {
    const body = { ...baseBody, ...bodyAdditions }
    switch (method) {
      case 'GET': {
        const query = Object.keys(body)
          .map(key => `${key}=${body[key as keyof typeof body]}`)
          .join('&')

        const res = await fetch(`${url}?${query}`)

        if (!res.ok) {
          console.error(
            `${res.status}: GET failed. Body: ${JSON.stringify(body)}`
          )
          return
        }

        const fetchedData = await res.json()
        setData(fetchedData)
        break
      }

      case 'POST':
      case 'PATCH':
      case 'DELETE': {
        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
        if (!res.ok) {
          console.error(
            `${res.status}: ${method} failed: ${JSON.stringify(body)}`
          )
        }
        break
      }
      default:
        console.error(`Error: ${method} is not a valid http method.`)
    }
  }

  return [data, fetchData]
}

export default useFetch
