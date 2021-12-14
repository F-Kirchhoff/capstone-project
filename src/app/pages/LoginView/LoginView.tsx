import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import LoginForm from '../../components/Forms/LoginForm'
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
      <Header>{tab}</Header>
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
          <LoginForm onSubmit={console.log} onCancel={() => nav(-1)} />
        )}
        {tab === 'register' && <RegisterContent>register</RegisterContent>}
      </Card>
    </PageContainer>
  )
}

const PageContainer = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Card = styled.div`
  background-color: var(--c-gray-50);
  padding: 20px;
  border-radius: 15px;
  min-width: 300px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
`
const Header = styled.h2`
  text-align: center;
  text-transform: capitalize;
  margin: 20px 0;
`
const LoginContent = styled.div``

const RegisterContent = styled.div``
