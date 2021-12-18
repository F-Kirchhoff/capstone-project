import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import useFetch from '../../hooks/useFetch'
import { BiChevronsLeft } from 'react-icons/bi'
import type { Board, Topic, User } from '../../types/types'
import FormInput from '../../components/FormInput/FormInput'
import Button from '../../components/Button/Button'

const MAX_TITLE_LENGTH = 40
const MAX_DESCRIPTION_LENGTH = 144

export default function AddBoard(): JSX.Element {
  const nav = useNavigate()
  const [_board, fetchBoard] = useFetch<Board>(`/api/topics`)
  const [name, setName] = useState('')
  const [users, setUsers] = useState<string[]>([])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const payload = {
      name,
      users,
    }
    await fetchBoard('POST', { payload })
    nav('/me')
  }

  function handleCancel() {
    setName('')
    setUsers([])
    nav('/me')
  }

  return (
    <AddBoardContainer>
      <ReturnButton to="..">
        <BiChevronsLeft size="32px" />
      </ReturnButton>
      <Header>Create Board</Header>
      <BoardFormContainer onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="title"
          required
          max={MAX_TITLE_LENGTH}
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <ButtonContainer>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button highlight>Create Board</Button>
        </ButtonContainer>
      </BoardFormContainer>
    </AddBoardContainer>
  )
}

const AddBoardContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 1fr 1fr;
  background-color: var(--c-secondary);
`

const ReturnButton = styled(Link)`
  position: absolute;
  top: 30px;
  left: 30px;
  color: var(--c-gray-50);
  text-decoration: none;
  align-content: center;
`

const Header = styled.h1`
  display: flex;
  align-items: center;
  color: var(--c-gray-50);
  margin: 30px;
  align-self: stretch;
  font-size: 4rem;
`

const BoardFormContainer = styled.form`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  background-color: var(--c-gray-100);
  color: var(--c-dark);
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`
