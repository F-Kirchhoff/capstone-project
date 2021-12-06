import React, { useState } from 'react'
import styled from 'styled-components'
import DoubleChevronLeft from '../../Icons/DoubleChevronLeft'

export type Proposal = {
  id: string
  description: string
  votes: {
    pro: string[]
    neutral: string[]
    remarks: string[]
    concerns: string[]
  }
}

type ProposalViewProps = {
  content: Proposal
}

type VoteCategories = 'PRO' | 'NEUTRAL' | 'REMARKS' | 'CONCERNS'

export default function ProposalView({ content }: ProposalViewProps) {
  const { description, votes } = content

  const [voteCategory, setVoteCategory] = useState<VoteCategories>('PRO')

  return (
    <ProposalViewContainer>
      <DoubleChevronLeft width={'24'} />
      <h1>Proposal</h1>
      <p>{description}</p>
      <CategoryContainer>
        <Category>Pro</Category>
        <Category>Neutral</Category>
        <Category>Remarks</Category>
        <Category>Concerns</Category>
      </CategoryContainer>
      <VotesContainer>
        {votes[voteCategory.toLowerCase()]
          .filter((voteText: string) => voteText !== '')
          .map((voteText: string) => (
            <VoteDisplay>{voteText}</VoteDisplay>
          ))}
      </VotesContainer>
    </ProposalViewContainer>
  )
}

const ProposalViewContainer = styled.div``

const CategoryContainer = styled.ul`
  list-style: none;
`

const Category = styled.li``

const VotesContainer = styled.ul``

const VoteDisplay = styled.li`
  list-style: none;
`
