import { useEffect, useState } from 'react'

function useFetch<Type>(
  method: string,
  url: string,
  body = undefined
): [Type | null, () => void] {
  const [data, setData] = useState(null)

  async function fetchData() {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.status === 200) {
      const fetchedData = await res.json()
      setData(fetchedData)
    } else {
      console.error(`${res.status}: Something went wrong :/`)
    }
  }

  return [data, fetchData]
}

export default useFetch
