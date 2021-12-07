import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import DoubleChevronRight from '../../Icons/DoubleChevronRight'
import type { Proposal as ProposalType } from '../../types/types'

type ProposalProps = {
  content: ProposalType
}

export default function Proposal({ content }: ProposalProps): JSX.Element {
  const { id, description, votes } = content
  return (
    <PropsoalContainer>
      <Description>{description}</Description>
      <VoteCounter>
        <span>+</span> <span>{votes.pro.length}</span>
      </VoteCounter>
      <VoteCounter>
        <span>=</span> <span>{votes.neutral.length}</span>
      </VoteCounter>
      <VoteCounter>
        <span>?</span> <span>{votes.remarks.length}</span>
      </VoteCounter>
      <VoteCounter>
        <span>!</span> <span>{votes.concerns.length}</span>
      </VoteCounter>
      <DetailViewButton to={`proposals/${id}`}>
        <DoubleChevronRight width={'24'} />
      </DetailViewButton>
    </PropsoalContainer>
  )
}

const PropsoalContainer = styled.li`
  position: relative;
  max-width: 400px;
  margin-right: 15px;
  background-color: var(--c-gray-200);
  list-style: none;
  border-radius: 2px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  & > * {
    background-color: var(--c-gray-50);
  }
`
const Description = styled.p`
  padding: 15px;
  grid-column: 1/-1;
`

const VoteCounter = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 5px;
  flex-grow: 1;
`

const DetailViewButton = styled(Link)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
  color: var(--c-gray-100);
  background-color: var(--c-primary);
  text-decoration: none;
  padding: 5px;
  border-radius: 999px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`
