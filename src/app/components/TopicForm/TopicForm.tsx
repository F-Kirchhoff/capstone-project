import React, { useState } from 'react'
import styled from 'styled-components'
import type { Topic } from '../../types/types'
import Button from '../Button/Button'

type TopicFormProps = {
  onSubmit: (newTopic: Topic) => void
  onCancel: () => void
}

export default function TopicForm({
  onSubmit,
  onCancel,
}: TopicFormProps): JSX.Element {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const newTopic = {
      id: Math.floor(Math.random() * 10000),
      title,
      description,
      needs: [],
    }
    onSubmit(newTopic)
  }

  function handleCancel() {
    setTitle('')
    setDescription('')
    onCancel()
  }

  return (
    <TopicFormContainer onSubmit={handleSubmit}>
      <FormTitle>Add Topic</FormTitle>
      <FormLabel htmlFor="title">Title</FormLabel>
      <FormInput
        type="text"
        name="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <FormLabel htmlFor="description">Description</FormLabel>
      <FormTextArea
        name="description"
        rows={10}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <ButtonContainer>
        <Button type="button" onClick={handleCancel}>
          Cancel
        </Button>
        <Button highlight>Add Topic</Button>
      </ButtonContainer>
    </TopicFormContainer>
  )
}

const FormTitle = styled.h2`
  color: var(--c-gray-200);
  font-size: 2.8rem;
  text-transform: uppercase;
  margin-bottom: 20px;
`

const TopicFormContainer = styled.form`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 20px;

  background-color: var(--c-gray-100);
  color: var(--c-dark);
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`
const FormLabel = styled.label`
  font-weight: bold;
  text-transform: capitalize;
`
const FormInput = styled.input`
  background-color: transparent;
  border: 1px solid var(--c-gray-600);
  padding: 8px 12px;
  margin-bottom: 20px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.125rem;
  color: var(--c-primary);
  transition: ease 0.3s;

  &:focus {
    outline: none;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`
const FormTextArea = styled.textarea`
  background-color: transparent;
  border: 1px solid var(--c-gray-600);
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
