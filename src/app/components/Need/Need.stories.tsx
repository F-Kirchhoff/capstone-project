import React from 'react'
import Need from './Need'

export default {
  title: 'Component/Need',
  component: Need,
}

const EXAMPLE = {
  text: 'We should get more beer.',
  id: '0',
  upvotes: ['peter', 'hans', 'j', 'a', 'b'],
}

const EXAMPLE_LONG = {
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quidem ipsa assumenda repellendus non est, nostrum tempora illo eum distinctio laudantium velit. Rem, eos incidunt nulla eaque beatae cum impedit.',
  id: '0',
  upvotes: ['ph1', 'peter', 'hans'],
}

export const Short = (): JSX.Element => {
  const user = 'ph1'

  const toggleUpvotes = (id: string) => () => {
    console.log(id)
  }

  return (
    <Need
      onDelete={() => {
        console.log('Delete')
      }}
      onEdit={() => {
        console.log('Edit')
      }}
      toggleUpvote={toggleUpvotes}
      content={EXAMPLE}
      user={user}
    />
  )
}
export const Long = (): JSX.Element => {
  const user = 'ph1'

  const toggleUpvotes = (id: string) => () => {
    console.log(id)
  }
  return (
    <Need
      onDelete={() => {
        console.log('Delete')
      }}
      onEdit={() => {
        console.log('Edit')
      }}
      toggleUpvote={toggleUpvotes}
      content={EXAMPLE_LONG}
      user={user}
    />
  )
}
