import React from 'react'
import Logo from './Logo'

export default {
  title: 'Component/Logo',
  component: Logo,
}

export const Regular = (): JSX.Element => <Logo />
export const Short = (): JSX.Element => <Logo short />
export const Regular_Light = (): JSX.Element => <Logo light />
export const Short_Light = (): JSX.Element => <Logo short light />
