import { useState } from 'react'

type fetchBody = {
  name?: string
  topicId?: string
  needId?: string
  proposalId?: string
  voteId?: string
  updateMsg?: string
  payload?: any
}

type useFetchReturnType<Type> = [
  Type | null,
  (method: string, body: fetchBody) => Promise<void>
]

function useFetch<Type>(url: string): useFetchReturnType<Type> {
  const [data, setData] = useState(null)

  async function fetchData(method: string, body: fetchBody) {
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

      case 'POST' || 'PATCH' || 'DELETE': {
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
