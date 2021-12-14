import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../Button/Button'
import FormInput from '../FormInput/FormInput'
import { BiHide, BiShow } from 'react-icons/bi'

type NeedFormProps = {
  onSubmit: (payload: { username: string; password: string }) => void
  onCancel: () => void
}

export default function NeedForm({
  onSubmit,
  onCancel,
}: NeedFormProps): JSX.Element {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  return (
    <Form onSubmit={() => onSubmit({ username, password })}>
      <FormInput
        type="email"
        name="username"
        value={username}
        onChange={event => {
          setUsername(event.target.value)
        }}
      />
      <PasswordWrapper>
        <FormInput
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={password}
          onChange={event => {
            setPassword(event.target.value)
          }}
        />
        <PasswordButton
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
        >
          {showPassword ? <BiHide size="24px" /> : <BiShow size="24px" />}
        </PasswordButton>
      </PasswordWrapper>

      <ButtonContainer>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button highlight>Login</Button>
      </ButtonContainer>
    </Form>
  )
}

const Form = styled.form`
  position: relative;
  margin-top: 20px;
  display: grid;
  gap: 20px;
`

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`
const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
`

const PasswordButton = styled.button`
  background-color: var(--c-gray-50);
  border: none;
  color: var(--c-primary);
  position: absolute;
  border-radius: 8px;
  right: 4px;
  bottom: 4px;
  padding: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
`
