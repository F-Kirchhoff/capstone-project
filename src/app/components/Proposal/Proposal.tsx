import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import type { Proposal as ProposalType, User } from '../../types/types'
import {
  FaStar,
  FaCheck,
  FaRegQuestionCircle,
  FaExclamationCircle,
} from 'react-icons/fa'
type ProposalProps = {
  content: ProposalType
  onVote: (type: string) => () => void
  user: User
}

export default function Proposal({
  content,
  onVote,
  user,
}: ProposalProps): JSX.Element {
  const { description, votes } = content

  const voteTypes = ['pro', 'neutral', 'remarks', 'concerns']
  const voteTypeSymbols = {
    pro: <FaStar size="1em" />,
    neutral: <FaCheck size="1em" />,
    remarks: <FaRegQuestionCircle size="1em" />,
    concerns: <FaExclamationCircle size="1em" />,
  }

  const userVote = votes.find(vote => vote.user === user.username)

  const voteTypeColors = {
    pro: '#d3b52e',
    neutral: 'var(--c-gray-100)',
    remarks: '#3c6c99',
    concerns: '#b95730',
  }

  return (
    <PropsoalContainer>
      <p>{description}</p>
      <VoteContainer>
        {voteTypes.map(type => {
          const count = votes.filter(vote => vote.type === type).length
          const icon = voteTypeSymbols[type as keyof typeof voteTypeSymbols]
          return (
            <VoteCounter
              key={type}
              onClick={onVote(type)}
              color={voteTypeColors[type as keyof typeof voteTypeColors]}
              active={userVote?.type === type}
            >
              {icon}
              <span>{count}</span>
            </VoteCounter>
          )
        })}
      </VoteContainer>
    </PropsoalContainer>
  )
}

const PropsoalContainer = styled.li`
  position: relative;
  padding: 15px;
  background-color: var(--c-gray-50);
  list-style: none;
  border-radius: 5px;
  display: grid;
  gap: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`

const VoteContainer = styled.div`
  display: flex;
  gap: 10px;
`

const VoteCounter = styled.button<{ active: boolean; color: string }>`
  display: flex;
  min-width: 3.5rem;
  justify-content: space-between;
  gap: 10px;
  font-weight: bold;
  background-color: ${({ color }) => color};
  color: rgb(0 0 0 / 50%);
  border: none;
  border-radius: 999px;
  align-items: center;
  padding: 5px 12px;
  opacity: ${({ active }) => (active ? '1' : '0.4')};
  cursor: pointer;
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
