import React from 'react'
import TopicForm from './TopicForm'

export default {
  title: 'Component/TopicForm',
  component: TopicForm,
}

export const Regular = (): JSX.Element => (
  <TopicForm
    onSubmit={console.log}
    onCancel={() => console.log('Cancel Button Clicked!')}
  />
)
