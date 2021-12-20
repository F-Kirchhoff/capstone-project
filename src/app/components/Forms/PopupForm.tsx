import React from 'react'
import styled from 'styled-components'
import Button from '../Button/Button'
import OverlayWrapper from '../OverlayWrapper/OverlayWrapper'

type FormProps = {
  onCancel: () => void
  onSubmit: () => void
  submitText: string
  children: React.ReactNode
}

export default function PopupForm({
  onCancel,
  onSubmit,
  children,
  submitText,
}: FormProps): JSX.Element {
  return (
    <OverlayWrapper onReturn={onCancel}>
      <FormContainer
        onSubmit={event => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <FormTitle>{submitText}</FormTitle>
        {children}
        <ButtonContainer>
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="secondary">{submitText}</Button>
        </ButtonContainer>
      </FormContainer>
    </OverlayWrapper>
  )
}
const FormTitle = styled.h2`
  font-size: 2.8rem;
  text-transform: uppercase;
`

const FormContainer = styled.form`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  color: rgb(255 255 255 / 30%);
  background-color: var(--c-gray-200);
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`
const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`
