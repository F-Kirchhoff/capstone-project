import React from 'react'
import styled from 'styled-components'

type FormInputProps = {
  type: 'text' | 'textArea'
  value: string
  name: string
  diff?: number
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  required?: boolean
}

export default function FormInput({
  type,
  value,
  onChange,
  name,
  diff,
  required,
}: FormInputProps): JSX.Element {
  return (
    <InputWrapper>
      <FormLabel htmlFor={name}>{name}</FormLabel>
      {type === 'text' ? (
        <Input
          type="text"
          name={name}
          required={required}
          value={value}
          onChange={onChange}
        />
      ) : (
        <TextArea
          name={name}
          rows={10}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
      {diff && <TextLimitDisplay diff={diff}>{`${diff}`}</TextLimitDisplay>}
    </InputWrapper>
  )
}

const FormLabel = styled.label`
  display: block;
  font-weight: bold;
  text-transform: capitalize;
`
const Input = styled.input`
  width: 100%;
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 8px 12px;
  margin-bottom: 20px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 18px;
  color: var(--c-primary);
  transition: ease 0.3s;

  &:focus {
    outline: none;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`
const TextArea = styled.textarea`
  width: 100%;
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  resize: none;
  font-size: 1rem;
  padding: 8px 12px;
  margin-bottom: 20px;
  color: var(--c-primary);
  transition: ease 0.3s;

  &:focus {
    outline: none;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`
const InputWrapper = styled.div`
  position: relative;
`

const TextLimitDisplay = styled.span<{ diff: number }>`
  position: absolute;
  bottom: 1.3rem;
  right: 10px;
  font-size: 0.8rem;
  z-index: 10;
  color: ${({ diff }) => (diff <= 0 ? 'var(--c-alert)' : 'rgba(0, 0, 0, 0.7)')};
`
