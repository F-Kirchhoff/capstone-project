import React, { useState } from 'react'
import styled from 'styled-components'
import type { Topic } from '../../types/types'
import Button from '../Button/Button'
import { nanoid } from 'nanoid'
import FormInput from '../FormInput/FormInput'

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
      proposals: [],
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
      <FormInput
        type="text"
        name="title"
        required
        diff={titleDiff}
        value={title}
        onChange={event =>
          event.target.value.length <= MAX_TITLE_LENGTH &&
          setTitle(event.target.value)
        }
      />
      <FormInput
        type="textArea"
        name="description"
        diff={descriptionDiff}
        value={description}
        onChange={event =>
          event.target.value.length <= MAX_DESCRIPTION_LENGTH &&
          setDescription(event.target.value)
        }
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

const TopicFormContainer = styled.form`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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
