import React, { useEffect, useState } from 'react'
import { BiChevronsRight } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../components/Button/Button'
import Logo from '../../components/Logo/Logo'
import type { User } from '../../types/types'

export default function ProfileView(): JSX.Element {
  const nav = useNavigate()

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/users')

      if (res.ok) {
        const user = await res.json()
        setUser(user)
      }
    }

    fetchUser()
  }, [])

  async function handleLogout() {
    await fetch('api/auth/logout', {
      method: 'POST',
    })
    nav('/login')
  }

  return (
    <ProfileContainer>
      <Navbar>
        <Logo short onClick={() => nav('/')} />
        <Button onClick={handleLogout}>logout</Button>
      </Navbar>
      {user && (
        <Content>
          <Greeting>Welcome back {user.username}</Greeting>
          <BoardsContainer>
            <h2>Your Boards</h2>
            <BoardList>
              {user.boards.map(board => (
                <Card key={board} onClick={() => nav(`/boards/${board}`)}>
                  <BoardName>{board}</BoardName>
                  <BiChevronsRight size="32px" />
                </Card>
              ))}
            </BoardList>
            <Button variant="primary" onClick={() => nav('/addBoard')}>
              Create new Board
            </Button>
          </BoardsContainer>
        </Content>
      )}
    </ProfileContainer>
  )
}
const ProfileContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: auto 1fr;
`
const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
  z-index: 10;
`
const Card = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  text-transform: capitalize;
  font-size: 1.5rem;
  font-weight: bold;
  background-color: var(--c-gray-50);
  border-radius: 999px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  word-wrap: break-word;
  cursor: pointer;
`
const Content = styled.main`
  background-color: var(--c-gray-100);
  overflow-y: auto;
  padding: 20px;
`

const BoardsContainer = styled.div`
  display: grid;
  align-content: start;
  justify-content: stretch;
  gap: 20px;
`

const BoardList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-self: center;
`
const BoardName = styled.h3``
const Greeting = styled.h1`
  font-family: 'Avia';
  font-size: 1.3rem;
  margin: 50px 0;
  font-size: 3rem;
  line-height: 1.6;
`
