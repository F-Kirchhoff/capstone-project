import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import BoardForm from '../../components/Forms/BoardForm'

import useFetch from '../../hooks/useFetch'

import type { Board } from '../../types/types'

export default function EditBoard(): JSX.Element {
  const nav = useNavigate()

  const { boardName } = useParams()

  const [board, fetchBoard] = useFetch<Board>(`/api/boards`, { boardName })

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

    await fetchBoard('PATCH', { payload })

    nav(`/boards/${newName}`)
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
    />
  )
}
