import React from 'react'
import AddProposal from './AddProposal'

export default {
  title: 'Page/AddProposal',
  component: AddProposal,
}

const needs = [
  {
    text: 'We should get more beer.',
    id: '0',
    upvotes: 34,
  },
  {
    text: 'We should get more beer.',
    id: '1',
    upvotes: 7,
  },
  {
    text: 'We should get more beer.',
    id: '2',
    upvotes: 12,
  },
  {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quidem ipsa assumenda repellendus non est, nostrum tempora illo eum distinctio laudantium velit. Rem, eos incidunt nulla eaque beatae cum impedit.',
    id: '3',
    upvotes: 3,
  },
]

export const Regular = (): JSX.Element => (
  <AddProposal needs={needs} onSubmit={() => console.log('Test')} />
)
