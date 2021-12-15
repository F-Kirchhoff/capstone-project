import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../components/Button/Button'
import Logo from '../../components/Logo/Logo'
import useFetch from '../../hooks/useFetch'

export default function ProfileView(): JSX.Element {
  const { username } = useParams()

  const [user, fetchUser] = useFetch('/api/users', { username })

  useEffect(() => {
    fetchUser('GET')
  }, [])

  return (
    <ProfileContainer>
      <Navbar>
        <Logo />
        <Button onClick={() => console.log('logout')}>logout</Button>
      </Navbar>
      <h2>Your Boards</h2>
      <BoardContainer>
        <BoardList>boards</BoardList>
        <Button>Create new Board</Button>
      </BoardContainer>
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
  padding: 20px;
  background-color: var(--c-gray-50);
  border-radius: 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  word-wrap: break-word;
`
const BoardContainer = styled.div`
  background-color: var(--c-gray-100);
  overflow-y: auto;
`

const BoardList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
`
