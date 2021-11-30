import React from 'react'
import Need from './Need'

export default {
  title: 'Component/Need',
  component: Need,
}

const EXAMPLE = {
  text: 'We should get more beer.',
  id: '0',
  upvotes: 12,
}

const EXAMPLE_LONG = {
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quidem ipsa assumenda repellendus non est, nostrum tempora illo eum distinctio laudantium velit. Rem, eos incidunt nulla eaque beatae cum impedit.',
  id: '0',
  upvotes: 3,
}

export const Short = (): JSX.Element => (
  <Need
    onUpvoteChange={(upvotes: number) => console.log(upvotes)}
    content={EXAMPLE}
  />
)
export const Long = (): JSX.Element => (
  <Need
    onUpvoteChange={(upvotes: number) => console.log(upvotes)}
    content={EXAMPLE_LONG}
  />
)
