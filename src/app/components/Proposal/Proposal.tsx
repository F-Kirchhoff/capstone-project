import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import type { Proposal as ProposalType } from '../../types/types'
import { BiChevronRight } from 'react-icons/bi'
import {
  FaStar,
  FaCheck,
  FaRegQuestionCircle,
  FaExclamationCircle,
} from 'react-icons/fa'
type ProposalProps = {
  content: ProposalType
}

export default function Proposal({ content }: ProposalProps): JSX.Element {
  const { id, description, votes } = content

  const voteTypes = ['pro', 'neutral', 'remarks', 'concerns']
  const voteTypeSymbols = {
    pro: <FaStar size="1em" />,
    neutral: <FaCheck size="1em" />,
    remarks: <FaRegQuestionCircle size="1em" />,
    concerns: <FaExclamationCircle size="1em" />,
  }

  return (
    <PropsoalContainer>
      <Description>{description}</Description>
      {voteTypes.map(type => (
        <VoteCounter key={type}>
          {voteTypeSymbols[type as keyof typeof voteTypeSymbols]}
          <span>{votes.filter(vote => vote.type === type).length}</span>
        </VoteCounter>
      ))}
      <DetailViewButton to={`proposals/${id}`}>
        <BiChevronRight size="24px" />
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
  align-items: center;
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
  line-height: 0;
  border-radius: 999px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`
