import React from 'react'
import VoteForm from './VoteForm'

export default {
  title: 'Component/VoteForm',
  component: VoteForm,
}

export const Regular = (): JSX.Element => (
  <VoteForm
    onSubmit={console.log}
    onCancel={() => console.log('Cancel Button Clicked!')}
  />
)
