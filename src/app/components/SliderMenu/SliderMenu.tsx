import React from 'react'
import styled from 'styled-components'

type SliderMenuProps = {
  options: {
    id: string
    text: string
  }[]
  selectedOption: string
  onSelect: (option: string) => void
}

export default function SliderMenu({
  options,
  selectedOption,
  onSelect,
}: SliderMenuProps): JSX.Element {
  return (
    <Container>
      {options.map(option => (
        <Option
          key={option.id}
          active={selectedOption === option.id}
          onClick={() => onSelect(option.id)}
        >
          {option.text}
        </Option>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`

const Option = styled.button<{ active: boolean }>`
  flex-grow: 1;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  border: none;
  background-color: transparent;
  transition: 0.1s ease;
  border-bottom: ${({ active }) =>
    active ? 'solid 3px var(--c-secondary)' : 'solid 3px transparent'};
`
