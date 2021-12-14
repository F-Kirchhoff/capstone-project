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

export default function LoginView({
  tab: initialTab,
}: LoginViewProps): JSX.Element {
  const [tab, setTab] = useState(initialTab)

  const nav = useNavigate()

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
          <LoginForm
            onSubmit={payload => console.log(payload)}
            onCancel={() => nav('/')}
          />
        )}
        {tab === 'register' && (
          <RegisterForm
            onSubmit={payload => console.log(payload)}
            onCancel={() => nav('/')}
          />
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
