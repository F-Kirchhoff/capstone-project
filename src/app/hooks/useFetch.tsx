import { useState } from 'react'

function useFetch<Type>(
  url: string
): [Type | null, (method: string, endpoint: string, body?: string) => void] {
  const [data, setData] = useState(null)

  async function fetchData(method: string, endpoint: string, body?: string) {
    switch (method) {
      case 'GET': {
        const res = await fetch(url)
        if (res.ok) {
          const fetchedData = await res.json()
          setData(fetchedData)
        } else {
          console.error(`${res.status}: Something went wrong :/`)
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
      case 'UPDATE': {
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
