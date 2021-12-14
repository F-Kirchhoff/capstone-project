import React from 'react'
import EditForm from './EditForm'

export default {
  title: 'Component/EditForm',
  component: EditForm,
}

export const Need = (): JSX.Element => (
  <EditForm
    onSubmit={console.log}
    onCancel={() => console.log('Cancel Button Clicked!')}
    content={{ description: 'I have a dream.' }}
  />
)
export const Topic = (): JSX.Element => (
  <EditForm
    onSubmit={console.log}
    onCancel={() => console.log('Cancel Button Clicked!')}
    content={{ title: 'Title for my speech', description: 'I have a dream.' }}
  />
)
export const Proposal = (): JSX.Element => (
  <EditForm
    onSubmit={console.log}
    onCancel={() => console.log('Cancel Button Clicked!')}
    content={{ description: 'I have a dream.' }}
  />
)
