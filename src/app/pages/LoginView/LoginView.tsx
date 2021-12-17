import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import LoginForm from '../../components/Forms/LoginForm'
import RegisterForm from '../../components/Forms/RegisterForm'
import Logo from '../../components/Logo/Logo'
import TabMenu, { Tab } from '../../components/TabMenu/TabMenu'
import useFetch from '../../hooks/useFetch'
import type { User } from '../../types/types'

type LoginViewProps = {
  tab: 'login' | 'register'
}

type LoginProps = {
  email: string
  password: string
}

export default function LoginView({
  tab: initialTab,
}: LoginViewProps): JSX.Element {
  const [tab, setTab] = useState(initialTab)
  const [loginFailed, setLoginFailed] = useState(false)
  const nav = useNavigate()

  const [user, fetchUser] = useFetch('/api/users')

  async function handleLogin({ email, password }: LoginProps) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload: { email, password } }),
    })
    if (res.ok) {
      const user = await res.json()
      console.log(user.username)

      nav(`/users/${user.username}`)
    } else {
      setLoginFailed(true)
    }
  }

  return (
    <PageContainer>
      <Logo />
      <Card>
        <TabMenu>
          <Tab
            key="login"
            active={tab === 'login'}
            onClick={() => setTab('login')}
          >
            login
          </Tab>
          <Tab
            key="register"
            active={tab === 'register'}
            onClick={() => setTab('register')}
          >
            register
          </Tab>
        </TabMenu>
        {tab === 'login' && (
          <>
            {loginFailed && (
              <ErrorMessage>Incorrect email or password.</ErrorMessage>
            )}
            <LoginForm onSubmit={handleLogin} onCancel={() => nav('/')} />
          </>
        )}
        {tab === 'register' && (
          <RegisterForm onSubmit={console.log} onCancel={() => nav('/')} />
        )}
      </Card>
    </PageContainer>
  )
}

const PageContainer = styled.main`
  padding-top: 100px;
  width: 100vw;
  display: grid;
  justify-items: center;
  gap: 100px;
`

const Card = styled.div`
  background-color: var(--c-gray-50);
  border-radius: 15px;
  min-width: 300px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
`
const ErrorMessage = styled.p`
  --rgb: 255 0 0;
  padding: 10px;
  margin: 20px;
  background-color: rgb(var(--rgb) / 0.3);
  color: var(--c-alert);
  border-radius: 5px;
`
