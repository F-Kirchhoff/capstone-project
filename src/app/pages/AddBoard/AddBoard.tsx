import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import BoardForm from '../../components/Forms/BoardForm'

export default function AddBoard(): JSX.Element {
  const nav = useNavigate()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(name: string, users: string[]) {
    const payload = {
      name,
      users,
    }

    const res = await fetch('api/boards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload }),
    })
    if (res.ok) {
      nav('/me')
    } else {
      const msg = await res.text()
      setError(msg)
    }
  }

  function handleCancel() {
    nav('/me')
  }

  return (
    <BoardForm
      board={{ name: '', users: [] }}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      errorMsg={error ? error : ''}
    />
  )
}
