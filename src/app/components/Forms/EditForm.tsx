import React, { useState } from 'react'
import FormInput from '../FormInput/FormInput'
import PopupForm from './PopupForm'

type ContentType = {
  title?: string
  description?: string
  need?: string
}
type ContentDiffsType = {
  title?: number
  description?: number
  need?: number
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

  if (!data) return <></>

  const ContentKeys = Object.keys(data)

  const contentDiffs: ContentDiffsType = {}

  ContentKeys.forEach(key => {
    const currentLength = data
      ? [key as keyof typeof content].length
      : MAX_LENGTHS[key as keyof typeof content]

    return MAX_LENGTHS[key as keyof typeof content] - currentLength
  })

  return (
    <PopupForm
      SubmitText="Edit"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      {ContentKeys.map(key => {
        const value = data[key as keyof typeof data]
        const diff = contentDiffs[key as keyof typeof data]

        return (
          <FormInput
            type={key === 'description' ? 'textArea' : 'text'}
            name={key}
            value={value ? value : 'Error'}
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
