import React from 'react'
import NeedForm from './NeedForm'

export default {
  title: 'Component/NeedForm',
  component: NeedForm,
}

export const Regular = (): JSX.Element => (
  <NeedForm
    onSubmit={console.log}
    onCancel={() => console.log('Cancel Button Clicked!')}
  />
)
