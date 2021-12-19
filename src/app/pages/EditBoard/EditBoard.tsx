import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import BoardForm from '../../components/Forms/BoardForm'

import useFetch from '../../hooks/useFetch'

import type { Board } from '../../types/types'

export default function EditBoard(): JSX.Element {
  const nav = useNavigate()

  const { boardName } = useParams()

  const [board, fetchBoard] = useFetch<Board>(`/api/boards`, { boardName })
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchBoard('GET')
  }, [])

  async function handleSubmit(name: string, users: string[]) {
    const newName = name.split(' ').join('-')
    const payload = {
      oldName: boardName,
      newName,
      users,
    }

    const res = await fetch('/api/boards', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload }),
    })
    if (res.ok) {
      nav(`/boards/${newName}`)
    } else {
      setError(true)
    }
  }

  function handleCancel() {
    nav(-1)
  }

  if (!board) {
    return <></>
  }

  return (
    <BoardForm
      edit
      board={{ name: board.name, users: board.users || [] }}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      errorMsg={error ? 'Something went wrong.' : ''}
    />
  )
}
