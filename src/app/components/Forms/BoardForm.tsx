import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { BiChevronsLeft } from 'react-icons/bi'
import { FaTimes, FaPlus } from 'react-icons/fa'
import FormInput from '../../components/FormInput/FormInput'
import Button from '../../components/Button/Button'
import FormPageBackground from '../FormpageBackground/FormPageBackground'

const MAX_TITLE_LENGTH = 40
const MAX_USERNAME_LENGTH = 40

type BoardFormProps = {
  board: {
    name: string
    users: string[]
  }
  onSubmit: (name: string, users: string[]) => void
  onCancel: () => void
  edit?: boolean
  errorMsg?: string
}

export default function BoardForm({
  board,
  onSubmit,
  onCancel,
  edit,
  errorMsg,
}: BoardFormProps): JSX.Element {
  const [name, setName] = useState(board.name)
  const [members, setMembers] = useState<string[]>(board.users)
  const [userQuery, setUserQuery] = useState('')

  const [foundUsers, setFoundUsers] = useState<string[]>([])

  function handleCancel() {
    setName('')
    setMembers([])
    onCancel()
  }
  function handleSubmit() {
    onSubmit(name, members)
  }

  const deleteUser = (username: string) => () => {
    setMembers(prev =>
      prev.length > 1 ? prev.filter(user => user !== username) : prev
    )
  }

  useEffect(() => {
    if (userQuery.length < 3) {
      setFoundUsers([])
      return
    }

    async function fetchUsers() {
      const res = await fetch(`/api/users/search?payload=${userQuery}`)
      if (!res.ok) {
        return
      }
      const foundUsers = await res.json()
      const processedUsers = foundUsers
        .filter((user: string) => !members.includes(user))
        .sort((a: string, b: string) => a.length - b.length)

      setFoundUsers(processedUsers)
    }

    fetchUsers()
  }, [userQuery])

  return (
    <FormPageBackground>
      <ReturnButton to="..">
        <BiChevronsLeft size="32px" />
      </ReturnButton>
      {edit ? <Header>Edit Board</Header> : <Header>Create Board</Header>}
      <BoardFormContainer>
        <div>
          <FormInput
            type="text"
            name="title"
            required
            max={MAX_TITLE_LENGTH}
            value={name}
            onChange={event => setName(event.target.value)}
          />
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        </div>
        <div>
          <h4>Add members to the board</h4>
          <UsersInput
            type="text"
            maxLength={MAX_USERNAME_LENGTH}
            value={userQuery}
            onChange={event => setUserQuery(event.target.value)}
          />
          {foundUsers && (
            <UsersList>
              {foundUsers.map(user => (
                <User key={user}>
                  <ActionButton>
                    <FaPlus size="1em" onClick={deleteUser(user)} />
                  </ActionButton>
                  <span>{user}</span>
                </User>
              ))}
            </UsersList>
          )}
          <h4>Members</h4>
          <UsersList>
            {members.map(user => (
              <User key={user}>
                <ActionButton>
                  <FaTimes size="1em" onClick={deleteUser(user)} />
                </ActionButton>
                <span>{user}</span>
              </User>
            ))}
          </UsersList>
        </div>

        <ButtonContainer>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            variant="gradient-highlight"
          >
            {edit ? 'Edit Board' : 'Create Board'}
          </Button>
        </ButtonContainer>
      </BoardFormContainer>
    </FormPageBackground>
  )
}

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
  margin-top: 100px;
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
  padding: 10px 0;
  font-size: 1.2rem;
  font-weight: bold;
`
const ErrorMessage = styled.p`
  --rgb: 255 0 0;
  padding: 10px;
  margin: 20px;
  background-color: rgb(var(--rgb) / 0.3);
  color: var(--c-alert);
  border-radius: 5px;
`

const UsersInput = styled.input`
  width: 100%;
  background-color: var(--c-gray-300);
  border: none;
  border-radius: 999px;
  padding: 10px 20px;
  font-size: 1.1rem;
`
const ActionButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s ease;
  padding: 5px;
  border-radius: 999px;
  &:hover {
    background-color: var(--c-gray-50);
  }
`
