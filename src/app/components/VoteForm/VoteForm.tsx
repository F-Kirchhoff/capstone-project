import React, { useState } from 'react'
import styled from 'styled-components'
import type { Vote } from '../../types/types'
import Button from '../Button/Button'
import { nanoid } from 'nanoid'
import FormInput from '../FormInput/FormInput'

type VoteFormProps = {
  onSubmit: (newVote: Vote) => void
  onCancel: () => void
}

type VoteTypes = 'pro' | 'neutral' | 'remarks' | 'concerns' | ''

const MAX_DESCRIPTION_LENGTH = 40

export default function VoteForm({
  onSubmit,
  onCancel,
}: VoteFormProps): JSX.Element {
  const [text, setText] = useState('')
  const [voteType, setVoteType] = useState<VoteTypes>('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const newVote = {
      id: nanoid(),
      text,
      voteType: voteType,
    }
    voteType && onSubmit(newVote)
  }

  function handleCancel() {
    setText('')
    setVoteType('')
    onCancel()
  }

  const textDiff = MAX_DESCRIPTION_LENGTH - text.length

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Add Vote</FormTitle>
      <FormInput
        type="text"
        name="comment"
        value={text}
        diff={textDiff}
        onChange={event => {
          event.target.value.length <= MAX_DESCRIPTION_LENGTH &&
            setText(event.target.value)
        }}
      />
      <ButtonContainer>
        <Button type="button" onClick={handleCancel}>
          Cancel
        </Button>
        <Button>Vote</Button>
      </ButtonContainer>
    </FormContainer>
  )
}

const FormTitle = styled.h2`
  color: rgba(255, 255, 255, 0.2);
  font-size: 2.8rem;
  text-transform: uppercase;
  margin-bottom: 20px;
`

const FormContainer = styled.form`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: rgba(255, 255, 255, 0.3);
  background-color: var(--c-secondary);
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
