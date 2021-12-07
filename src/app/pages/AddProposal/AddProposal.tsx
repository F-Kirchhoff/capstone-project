import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import DoubleChevronLeft from '../../Icons/DoubleChevronLeft'
import type { Proposal } from '../../types/types'

type AddProposalProps = {
  onSubmit: (proposal: Proposal) => void
}

export default function AddProposal({
  onSubmit,
}: AddProposalProps): JSX.Element {
  return (
    <FormContainer>
      <ReturnButton to="/">
        <DoubleChevronLeft width={'24'} />
      </ReturnButton>
      <Header>Add Proposal</Header>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 1fr 1fr;
  background-color: var(--c-secondary);
`

const ReturnButton = styled(Link)`
  position: absolute;
  top: 30px;
  left: 30px;
  color: var(--c-gray-50);
  text-decoration: none;
  align-content: center;
`

const Header = styled.h1`
  display: flex;
  align-items: center;
  color: var(--c-gray-50);
  margin: 30px;
  align-self: stretch;
  font-size: 4rem;
`
