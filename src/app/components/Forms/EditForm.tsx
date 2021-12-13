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

  function handleSubmit() {
    if (data) onSubmit(data)
  }

  function handleCancel() {
    setData({ description: '' })
    onCancel()
  }

  const ContentKeys = Object.keys(data)

  return (
    <PopupForm
      submitText="Edit"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      {ContentKeys.map(key => {
        const value = data[key as keyof typeof data]

        return (
          <FormInput
            key={key}
            type={key === 'description' ? 'textArea' : 'text'}
            name={key}
            value={typeof value !== 'string' ? '' : value}
            max={MAX_LENGTHS[key as keyof typeof content]}
            onChange={event =>
              setData(prev => ({ ...prev, [key]: event.target.value }))
            }
          />
        )
      })}
    </PopupForm>
  )
}
