import React, { useEffect } from 'react'
import { BiChevronsRight } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../components/Button/Button'
import Logo from '../../components/Logo/Logo'
import useFetch from '../../hooks/useFetch'
import type { User } from '../../types/types'

export default function ProfileView(): JSX.Element {
  const { username } = useParams()
  const nav = useNavigate()

  const [user, fetchUser] = useFetch<User>('/api/users', { username })

  useEffect(() => {
    fetchUser('GET')
  }, [])

  return (
    <ProfileContainer>
      <Navbar>
        <Logo />
        <Button onClick={() => console.log('logout')}>logout</Button>
      </Navbar>
      {user && (
        <Content>
          <Greeting>Welcome back {user.username}</Greeting>
          <BoardsContainer>
            <h2>Your Boards</h2>
            <BoardList>
              {user.boards.map(board => (
                <Card onClick={() => nav(`/boards/${board}`)}>
                  <BoardName>{board}</BoardName>
                  <BiChevronsRight size="32px" />
                </Card>
              ))}
            </BoardList>
            <Button>Create new Board</Button>
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
  padding: 15px;
  z-index: 10;
`
const Card = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: var(--c-gray-50);
  border-radius: 15px;
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
const BoardName = styled.h3`
  text-transform: capitalize;
  font-size: 1.3rem;
`
const Greeting = styled.h1`
  margin: 50px 0;
  font-size: 3rem;
  line-height: 1.6;
`
