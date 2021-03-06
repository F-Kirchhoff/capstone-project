import React from 'react'
import styled from 'styled-components'

type FormInputProps = {
  type: 'text' | 'textArea' | 'email' | 'password'
  value: string
  name: string
  max?: number
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
  max,
  required,
}: FormInputProps): JSX.Element {
  const diff = max ? max - value.length : Infinity
  return (
    <InputWrapper>
      <FormLabel htmlFor={name}>{name}</FormLabel>
      {type !== 'textArea' ? (
        <Input
          type={type}
          name={name}
          required={required}
          value={value}
          maxLength={max}
          onChange={onChange}
        />
      ) : (
        <TextArea
          name={name}
          rows={10}
          value={value}
          maxLength={max}
          onChange={onChange}
          required={required}
        />
      )}
      {max !== undefined && (
        <TextLimitDisplay diff={diff}>{`${diff}`}</TextLimitDisplay>
      )}
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
  border-radius: 12px;
  font-weight: bold;
  font-size: 18px;
  color: var(--c-primary);
  transition: ease 0.3s;

  &:focus {
    outline: none;
    box-shadow: rgba(80, 8, 83, 0.63) 0px 2px 4px,
      rgba(38, 10, 104, 0.596) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
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
  color: var(--c-primary);
  transition: ease 0.3s;

  &:focus {
    outline: none;
    box-shadow: rgba(80, 8, 83, 0.63) 0px 2px 4px,
      rgba(38, 10, 104, 0.596) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }
`
const InputWrapper = styled.div`
  position: relative;
`

const TextLimitDisplay = styled.span<{ diff: number }>`
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 0.8rem;
  z-index: 10;
  color: ${({ diff }) => (diff <= 0 ? 'var(--c-alert)' : 'inherit')};
`
