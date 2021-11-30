import React, { useState } from 'react'
import styled from 'styled-components'
import type { Topic } from '../../types/types'
import Button from '../Button/Button'
import { nanoid } from 'nanoid'

type TopicFormProps = {
  onSubmit: (newTopic: Topic) => void
  onCancel: () => void
}

const MAX_TITLE_LENGTH = 40
const MAX_DESCRIPTION_LENGTH = 144

export default function TopicForm({
  onSubmit,
  onCancel,
}: TopicFormProps): JSX.Element {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const newTopic = {
      id: nanoid(),
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

  const titleDiff = MAX_TITLE_LENGTH - title.length
  const descriptionDiff = MAX_DESCRIPTION_LENGTH - description.length

  return (
    <TopicFormContainer onSubmit={handleSubmit}>
      <FormTitle>Add Topic</FormTitle>
      <InputWrapper>
        <FormLabel htmlFor="title">Title*</FormLabel>
        <FormInput
          type="text"
          name="title"
          required
          value={title}
          onChange={event =>
            event.target.value.length <= MAX_TITLE_LENGTH &&
            setTitle(event.target.value)
          }
        />
        <TextLimitDisplay diff={titleDiff}>{`${titleDiff}`}</TextLimitDisplay>
      </InputWrapper>
      <InputWrapper>
        <FormLabel htmlFor="description">Description</FormLabel>
        <FormTextArea
          name="description"
          rows={10}
          value={description}
          onChange={event =>
            event.target.value.length <= MAX_DESCRIPTION_LENGTH &&
            setDescription(event.target.value)
          }
        />
        <TextLimitDisplay diff={descriptionDiff}>
          {`${descriptionDiff}`}
        </TextLimitDisplay>
      </InputWrapper>

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
  display: block;
  font-weight: bold;
  text-transform: capitalize;
`
const FormInput = styled.input`
  width: 100%;
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
  width: 100%;
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
const InputWrapper = styled.div`
  position: relative;
`

const TextLimitDisplay = styled.span<{ diff: number }>`
  position: absolute;
  bottom: 1.3rem;
  right: 10px;
  font-size: 0.8rem;
  z-index: 10;
  color: ${({ diff }) => (diff <= 0 ? 'var(--c-alert)' : 'var(--c-gray-500)')};
`
