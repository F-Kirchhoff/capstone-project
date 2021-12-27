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
  const [loginError, setLoginError] = useState<string | null>(null)
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  )
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
      nav(`/me`)
    } else {
      const msg = await res.text()
      console.log(msg)

      setLoginError(msg)
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
      handleLogin({ email, password })
    } else {
      const msg = await res.text()
      setRegistrationError(msg)
    }
  }

  return (
    <PageContainer>
      <Logo light />
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
            {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
            <LoginForm onSubmit={handleLogin} onCancel={() => nav('/')} />
          </>
        )}
        {tab === 'register' && (
          <>
            {registrationError && (
              <ErrorMessage>{registrationError}</ErrorMessage>
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
  min-height: 100vh;
  display: grid;
  justify-items: center;
  align-content: start;
  gap: 100px;
  background: var(--c-gradient-primary);
`

const Card = styled.div`
  background: var(--c-gray-50);
  border-radius: 15px;
  min-width: 300px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
`
const ErrorMessage = styled.p`
  --rgb: 255 0 30;
  padding: 10px;
  margin: 20px;
  background-color: rgb(var(--rgb) / 0.3);
  color: var(--c-alert);
  border-radius: 5px;
`
