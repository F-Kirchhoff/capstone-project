import React from 'react'

export default function Logo({
  short,
  onClick,
}: {
  short?: boolean
  onClick?: () => void
}): JSX.Element {
  return short ? (
    <img src="/src/app/assets/LogoShort.png" onClick={onClick} />
  ) : (
    <img src="/src/app/assets/LogoFull.png" onClick={onClick} />
  )
}
