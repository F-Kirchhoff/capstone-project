import React from 'react'
import styled from 'styled-components'
import Button from '../Button/Button'
import OverlayWrapper from '../OverlayWrapper/OverlayWrapper'

type AlertProps = {
  onCancel: () => void
  onConfirm: () => void
  children: React.ReactNode
}

export default function Alert({
  children,
  onCancel,
  onConfirm,
}: AlertProps): JSX.Element {
  return (
    <OverlayWrapper onReturn={onCancel}>
      <AlertContainer>
        <h2>Caution</h2>
        {children}
        <ButtonContainer>
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={onConfirm}>
            Continue
          </Button>
        </ButtonContainer>
      </AlertContainer>
    </OverlayWrapper>
  )
}

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`

const AlertContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--c-gray-100);
  z-index: 1010;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
