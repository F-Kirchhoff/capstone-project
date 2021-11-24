import React from 'react'
import Need from './Need'

export default {
  title: 'Component/Need',
  component: Need,
}

const EXAMPLE = {
  text: 'We should get more beer.',
  id: 0,
}

const EXAMPLE_LONG = {
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quidem ipsa assumenda repellendus non est, nostrum tempora illo eum distinctio laudantium velit. Rem, eos incidunt nulla eaque beatae cum impedit.',
  id: 0,
}

export const Idle = (): JSX.Element => <Need content={EXAMPLE}></Need>
export const Upvoted = (): JSX.Element => <Need content={EXAMPLE}></Need>
export const Long = (): JSX.Element => <Need content={EXAMPLE_LONG}></Need>
