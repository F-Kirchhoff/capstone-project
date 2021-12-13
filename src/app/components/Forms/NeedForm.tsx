import React, { useState } from 'react'
import FormInput from '../FormInput/FormInput'
import PopupForm from '../Forms/PopupForm'

type NeedFormProps = {
  onSubmit: (payload: { text: string }) => void
  onCancel: () => void
}

export default function NeedForm({
  onSubmit,
  onCancel,
}: NeedFormProps): JSX.Element {
  const [text, setText] = useState('')

  return (
    <PopupForm
      SubmitText="Add Need"
      onSubmit={() => onSubmit({ text })}
      onCancel={() => {
        setText('')
        onCancel()
      }}
    >
      <FormInput
        type="textArea"
        name="need"
        value={text}
        max={144}
        onChange={event => {
          setText(event.target.value)
        }}
      />
    </PopupForm>
  )
}
