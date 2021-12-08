import React, { useState } from 'react'
import styled from 'styled-components'
import type { Need } from '../../types/types'
import Button from '../Button/Button'
import { nanoid } from 'nanoid'

type VoteFormProps = {
  onSubmit: (newVote: Vote) => void
  onCancel: () => void
}

type VoteTypes = 'pro' | 'neutral' | 'remarks' | 'concerns' | null

const MAX_DESCRIPTION_LENGTH = 40

export default function VoteForm({
  onSubmit,
  onCancel,
}: VoteFormProps): JSX.Element {
  const [text, setText] = useState('')
  const [voteType, setVoteType] = useState<VoteTypes>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const newVote = {
      id: nanoid(),
      text,
      voteType: voteType,
    }
    onSubmit(newVote)
  }

  function handleCancel() {
    setText('')
    onCancel()
  }

  const textDiff = MAX_DESCRIPTION_LENGTH - text.length

  return (
    <TopicFormContainer onSubmit={handleSubmit}>
      <FormTitle>Add Need</FormTitle>
      <InputWrapper>
        <FormLabel htmlFor="text">Need</FormLabel>
        <FormTextArea
          name="text"
          rows={10}
          value={text}
          onChange={event =>
            event.target.value.length <= MAX_DESCRIPTION_LENGTH &&
            setText(event.target.value)
          }
        />
        <TextLimitDisplay diff={textDiff}>{`${textDiff}`}</TextLimitDisplay>
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
  color: rgba(255, 255, 255, 0.2);
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
  color: rgba(255, 255, 255, 0.3);
  background-color: var(--c-dark);
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
  color: var(--c-gray-200);
`

const FormTextArea = styled.textarea`
  width: 100%;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--c-gray-200);
  border-radius: 12px;
  resize: none;
  font-size: 1rem;
  padding: 8px 12px;
  margin-bottom: 20px;
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
