import { useState } from 'react'

function useFetch<Type>(
  url: string
): [Type | null, (method: string, body?: any) => void] {
  const [data, setData] = useState(null)

  async function fetchData(method: string, body?: any) {
    switch (method) {
      case 'GET': {
        const res = await fetch(url)
        if (res.ok) {
          const fetchedData = await res.json()
          setData(fetchedData)
        } else {
          console.error(`${res.status}: Something went wrong :/`)
        }
        return
      }

      case 'POST': {
        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: body ? JSON.stringify(body) : '[]',
        })
        if (res.ok) {
          const fetchedData = await res.json()
          setData(fetchedData)
        } else {
          console.error(`${res.status}: Something went wrong :/`)
        }
        return
      }
      default:
        console.error(`Error: ${method} is not a valid http type.`)
    }
  }

  return [data, fetchData]
}

export default useFetch
