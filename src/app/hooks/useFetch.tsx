import { useState } from 'react'

function useFetch<Type>(
  method: string,
  url: string,
  body?: any
): [Type | null, () => void] {
  const [data, setData] = useState(null)

  async function fetchData() {
    switch (method) {
      case 'GET': {
        const res = await fetch(url)
        if (res.status === 200) {
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
          body,
        })
        if (res.status === 200) {
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
