import React from 'react'
import AddProposal from './AddProposal'

export default {
  title: 'Page/AddProposal',
  component: AddProposal,
}

export const Regular = (): JSX.Element => (
  <AddProposal onSubmit={() => console.log('Test')} />
)
