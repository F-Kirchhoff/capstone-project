import React from 'react'
import Need from './Need'

export default {
  title: 'Component/Need',
  component: Need,
}

const EXAMPLE = {
  text: 'We should get more beer.',
  upvotes: 23,
}

const EXAMPLE_LONG = {
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quidem ipsa assumenda repellendus non est, nostrum tempora illo eum distinctio laudantium velit. Rem, eos incidunt nulla eaque beatae cum impedit.',
  upvotes: 3,
}

export const Idle = (): JSX.Element => (
  <Need content={EXAMPLE} isUpvoted={false}></Need>
)
export const Upvoted = (): JSX.Element => (
  <Need content={EXAMPLE} isUpvoted={true}></Need>
)
export const Long = (): JSX.Element => (
  <Need content={EXAMPLE_LONG} isUpvoted={false}></Need>
)
