import React, { useState } from 'react'
import FormInput from '../FormInput/FormInput'
import PopupForm from '../Forms/PopupForm'

type NeedFormProps = {
  onSubmit: (payload: { text: string }) => void
  onCancel: () => void
}

const MAX_DESCRIPTION_LENGTH = 80

export default function NeedForm({
  onSubmit,
  onCancel,
}: NeedFormProps): JSX.Element {
  const [text, setText] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const payload = {
      text,
    }
    onSubmit(payload)
  }

  function handleCancel() {
    setText('')
    onCancel()
  }

  const textDiff = MAX_DESCRIPTION_LENGTH - text.length

  return (
    <PopupForm
      SubmitText="Add Need"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      <FormInput
        type="textArea"
        name="need"
        value={text}
        diff={textDiff}
        onChange={event => {
          event.target.value.length <= MAX_DESCRIPTION_LENGTH &&
            setText(event.target.value)
        }}
      />
    </PopupForm>
  )
}
