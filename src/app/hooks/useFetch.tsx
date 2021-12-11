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
  (method: string, body: fetchBody) => void
]

function useFetch<Type>(url: string): useFetchReturnType<Type> {
  const [data, setData] = useState(null)

  async function fetchData(method: string, body: string) {
    switch (method) {
      case 'GET': {
        const query = Object.keys(body)
          .map(key => `${key}=${body[key as keyof typeof body]}`)
          .join('&')
        const res = await fetch(`${url}?${query}`)
        if (res.ok) {
          const fetchedData = await res.json()
          setData(fetchedData)
        } else {
          console.error(
            `${res.status}: Fetch failed. Body: ${JSON.stringify(body)}`
          )
        }
        break
      }

      case 'POST': {
        const res = await fetch(`${url}${endpoint}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: body || '[]',
        })
        if (!res.ok) {
          console.error(`${res.status}: Something went wrong :/`)
        }
        break
      }
      case 'PATCH': {
        const res = await fetch(`${url}${endpoint}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: body || '[]',
        })
        if (!res.ok) {
          console.error(`${res.status}: Something went wrong :/`)
        }
        break
      }
      case 'DELETE': {
        const res = await fetch(`${url}${endpoint}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: body || '[]',
        })
        if (!res.ok) {
          console.error(`${res.status}: Something went wrong :/`)
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
