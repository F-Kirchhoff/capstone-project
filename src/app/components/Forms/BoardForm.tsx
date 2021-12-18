import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { BiChevronsLeft } from 'react-icons/bi'
import { TiDelete } from 'react-icons/ti'
import FormInput from '../../components/FormInput/FormInput'
import Button from '../../components/Button/Button'

const MAX_TITLE_LENGTH = 40
const MAX_USERNAME_LENGTH = 40

type BoardFormProps = {
  board: {
    name: string
    users: string[]
  }
  onSubmit: (name: string, users: string[]) => void
  onCancel: () => void
}

export default function BoardForm({
  board,
  onSubmit,
  onCancel,
}: BoardFormProps): JSX.Element {
  const [name, setName] = useState(board.name)
  const [users, setUsers] = useState<string[]>(board.users)
  const [newUser, setNewUser] = useState('')

  function handleCancel() {
    setName('')
    setUsers([])
    onCancel()
  }
  function handleSubmit() {
    onSubmit(name, users)
  }

  const deleteUser = (username: string) => () => {
    setUsers(prev => prev.filter(user => user !== username))
  }

  return (
    <AddBoardContainer>
      <ReturnButton to="..">
        <BiChevronsLeft size="32px" />
      </ReturnButton>
      <Header>Create Board</Header>
      <BoardFormContainer>
        <FormInput
          type="text"
          name="title"
          required
          max={MAX_TITLE_LENGTH}
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <div>
          <h3>Add users to the board</h3>
          <UsersList>
            {users.map(user => (
              <User key={user}>
                <TiDelete size="1.5em" onClick={deleteUser(user)} />
                <span>{user}</span>
              </User>
            ))}
          </UsersList>
          <UsersForm>
            <FormInput
              type="text"
              name="new user"
              max={MAX_USERNAME_LENGTH}
              value={newUser}
              onChange={event => setNewUser(event.target.value)}
            />
            <Button
              type="button"
              onClick={() => {
                setUsers(prev => [...prev, newUser])
                setNewUser('')
              }}
            >
              +
            </Button>
          </UsersForm>
        </div>

        <ButtonContainer>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit} highlight>
            Create Board
          </Button>
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

const UsersForm = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 10px;
`
const UsersList = styled.ul`
  max-height: 30vh;
  overflow-y: auto;
  list-style: none;
  display: grid;
  & > li:nth-child(n + 2) {
    border-top: 1px solid rgb(0 0 0 / 30%);
  }
`
const User = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
  font-size: 1.2rem;
  font-weight: bold;
`
