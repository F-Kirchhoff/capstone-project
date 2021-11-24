import styled from 'styled-components'

type ButtonProps = {
  highlight?: boolean
}

const Button = styled.button<ButtonProps>`
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  background-color: ${(props) =>
    props.highlight ? 'var(--c-secondary)' : 'var(--c-gray-300)'};
  color: ${(props) => (props.highlight ? 'var(--c-gray-50)' : 'var(--c-dark)')};
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  cursor: pointer;
`

export default Button
