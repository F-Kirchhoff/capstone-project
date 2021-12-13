import React, { useState } from 'react'
import FormInput from '../FormInput/FormInput'
import PopupForm from './PopupForm'

type ContentType = {
  title?: string
  description?: string
}

type EditFormProps = {
  onSubmit: (payload: ContentType) => void
  onCancel: () => void
  content: ContentType
}

const MAX_LENGTHS = {
  need: 80,
  title: 40,
  description: 144,
}

type DEFAULT = {
  description: string
}

export default function EditForm({
  onSubmit,
  onCancel,
  content,
}: EditFormProps): JSX.Element {
  const [data, setData] = useState<ContentType | DEFAULT>(content)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    data && onSubmit(data)
  }

  function handleCancel() {
    setData({ description: '' })
    onCancel()
  }

  const ContentKeys = Object.keys(data)

  return (
    <PopupForm
      SubmitText="Edit"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      {ContentKeys.map(key => {
        const value = data[key as keyof typeof data]
        const diff =
          value !== undefined
            ? MAX_LENGTHS[key as keyof typeof content] - value.length
            : Infinity

        return (
          <FormInput
            key={key}
            type={key === 'description' ? 'textArea' : 'text'}
            name={key}
            value={typeof value !== 'string' ? '' : value}
            diff={diff}
            onChange={event => {
              event.target.value.length <=
                MAX_LENGTHS[key as keyof typeof data] &&
                setData(prev => ({ ...prev, [key]: event.target.value }))
            }}
          />
        )
      })}
    </PopupForm>
  )
}
