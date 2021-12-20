import styled from 'styled-components'

type ButtonProps = {
  variant?: string
}

const Button = styled.button<ButtonProps>`
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.05rem;
  background: ${({ variant }) =>
    variant ? `var(--c-${variant})` : 'var(--c-gray-500)'};
  color: var(--c-light);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  cursor: pointer;
`

export default Button
