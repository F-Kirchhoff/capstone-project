import React, { useState } from 'react'
import FormInput from '../FormInput/FormInput'
import {
  FaStar,
  FaCheck,
  FaRegQuestionCircle,
  FaExclamationCircle,
} from 'react-icons/fa'
import PopupForm from './PopupForm'
import styled from 'styled-components'

type VoteFormProps = {
  onSubmit: (payload: { type: VoteTypes; text: string }) => void
  onCancel: () => void
}

type VoteTypes = 'pro' | 'neutral' | 'remarks' | 'concerns' | 'none'

export default function VoteForm({
  onSubmit,
  onCancel,
}: VoteFormProps): JSX.Element {
  const [text, setText] = useState('')
  const [voteType, setVoteType] = useState<VoteTypes>('none')
  const [submitError, setSubmitError] = useState(false)

  function handleSubmit() {
    if (voteType === 'none') {
      setSubmitError(true)
      return
    }

    const payload = {
      text,
      type: voteType,
    }
    onSubmit(payload)
  }

  function handleCancel() {
    setText('')
    setVoteType('none')
    setSubmitError(false)
    onCancel()
  }

  const voteTypes: VoteTypes[] = ['pro', 'neutral', 'remarks', 'concerns']
  const voteTypeSymbols = {
    pro: <FaStar size="1em" />,
    neutral: <FaCheck size="1em" />,
    remarks: <FaRegQuestionCircle size="1em" />,
    concerns: <FaExclamationCircle size="1em" />,
  }
  const voteTypeColors = {
    pro: '#65ac95',
    neutral: 'var(--c-gray-100)',
    remarks: '#b6a55c',
    concerns: '#b95730',
    none: 'var(--c-gray-200)',
  }

  return (
    <PopupForm
      SubmitText="Add Vote"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      <div>
        <h4>Consent Level</h4>
        <VoteTypePicker>
          {voteTypes.map((type: VoteTypes) => (
            <VoteType
              key={type}
              type="button"
              color={voteTypeColors[type as keyof typeof voteTypeColors]}
              onClick={() => setVoteType(type)}
              active={voteType === type}
            >
              {voteTypeSymbols[type as keyof typeof voteTypeSymbols]}
            </VoteType>
          ))}
        </VoteTypePicker>
      </div>
      <FormInput
        type="text"
        name="comment (optional)"
        value={text}
        max={144}
        onChange={event => setText(event.target.value)}
      />
      {submitError && <p>You have to choose a consent level before voting.</p>}
    </PopupForm>
  )
}

const VoteTypePicker = styled.fieldset`
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`

const VoteType = styled.button<{ active: boolean; color: string }>`
  background-color: ${({ color }) => color};
  color: rgba(0, 0, 0, 0.4);
  font-weight: bold;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ active }) => (active ? '1' : '0.7')};
  padding: 10px 20px;
  font-size: 1.2rem;
  border: none;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  transition: 0.2s;
  box-shadow: ${({ active }) =>
    active
      ? '  rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'
      : 'unset'};
  z-index: ${({ active }) => (active ? '10' : '1')};
  &:hover {
    opacity: 1;
  }

  &:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  &:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`
