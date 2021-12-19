import React from 'react'
import { useNavigate } from 'react-router'
import BoardForm from '../../components/Forms/BoardForm'

import useFetch from '../../hooks/useFetch'

import type { Board } from '../../types/types'

export default function AddBoard(): JSX.Element {
  const nav = useNavigate()
  const [_board, fetchBoard] = useFetch<Board>(`/api/boards`)

  async function handleSubmit(name: string, users: string[]) {
    const payload = {
      name,
      users,
    }

    await fetchBoard('POST', { payload })
    nav('/me')
  }

  function handleCancel() {
    nav('/me')
  }

  return (
    <BoardForm
      board={{ name: '', users: [] }}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  )
}
