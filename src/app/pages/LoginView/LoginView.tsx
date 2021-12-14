import React from 'react'
import styled from 'styled-components'

type LoginViewProps = {
  tab: 'login' | 'register'
}

export default function LoginView({ tab }: LoginViewProps): JSX.Element {
  return (
    <PageContainer>
      <Card>
        <LoginContent>login</LoginContent>
        <RegisterContent>register</RegisterContent>
      </Card>
    </PageContainer>
  )
}

const PageContainer = styled.main``

const Card = styled.div``

const LoginContent = styled.div``

const RegisterContent = styled.div``
