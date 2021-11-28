import React from 'react'
import { addDecorator } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import GlobalStyle from '../src/app/GlobalStyle'

addDecorator(s => (
  <>
    <GlobalStyle />
    {s()}
  </>
))

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
