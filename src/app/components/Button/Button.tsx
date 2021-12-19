import styled from 'styled-components'

const buttonStyles = {
  highlight: 'var(--c-secondary)',
  alert: 'var(--c-alert)',
  warning: 'var(--c-warning)',
  success: 'var(--c-success)',
  neutral: 'var(--c-gray-300)',
}

type ButtonProps = {
  highlight?: boolean
  style?: keyof typeof buttonStyles
}

const Button = styled.button<ButtonProps>`
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  background-color: ${({ style }) =>
    style
      ? buttonStyles[style as keyof typeof buttonStyles]
      : buttonStyles.neutral};
  color: ${props => (props.highlight ? 'var(--c-gray-50)' : 'var(--c-dark)')};
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  cursor: pointer;
`

export default Button
