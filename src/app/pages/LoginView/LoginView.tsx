import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import LoginForm from '../../components/Forms/LoginForm'
import RegisterForm from '../../components/Forms/RegisterForm'
import Logo from '../../components/Logo/Logo'
import TabMenu, { Tab } from '../../components/TabMenu/TabMenu'

type LoginViewProps = {
  tab: 'login' | 'register'
}

type LoginProps = {
  email: string
  password: string
}
type RegisterProps = {
  email: string
  password: string
  username: string
}

export default function LoginView({
  tab: initialTab,
}: LoginViewProps): JSX.Element {
  const [tab, setTab] = useState(initialTab)
  const [loginFailed, setLoginFailed] = useState(false)
  const [registerFailed, setRegisterFailed] = useState(false)
  const nav = useNavigate()

  async function handleLogin({ email, password }: LoginProps) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload: { email, password } }),
    })
    if (res.ok) {
      const session = await res.json()
      console.log(session)

      nav(`/users/${session.user}`)
    } else {
      setLoginFailed(true)
    }
  }

  async function handleRegister({ username, email, password }: RegisterProps) {
    if (!username || !email || !password) {
      console.error('Error: Bad Input.')
      return
    }

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload: { email, password, username } }),
    })
    if (res.ok) {
      nav(`/users/${username}`)
    } else {
      setRegisterFailed(true)
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
          <>
            {registerFailed && (
              <ErrorMessage>Username or email already in use.</ErrorMessage>
            )}
            <RegisterForm onSubmit={handleRegister} onCancel={() => nav('/')} />
          </>
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
