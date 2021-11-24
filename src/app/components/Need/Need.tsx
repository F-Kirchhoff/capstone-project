import React from 'react'
import styled from 'styled-components'
import type { Need as NeedType } from '../../types/types'

type NeedProps = {
  content: NeedType
}

export default function Need({ content }: NeedProps): JSX.Element {
  const { text } = content
  return (
    <NeedContainer>
      <p>{text}</p>
    </NeedContainer>
  )
}

const NeedContainer = styled.li`
  display: grid;
  grid-template-columns: 1fr;
  align-items: start;
  gap: 10px;
  padding: 10px 20px;
  background-color: var(--c-gray-50);
`
