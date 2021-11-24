import React from 'react'
import IconWrapper from './IconWrapper'

type IconProps = {
  width?: string
}

export default function ChevronDown({ width }: IconProps): JSX.Element {
  return (
    <IconWrapper width={width}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </IconWrapper>
  )
}
