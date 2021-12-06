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
        <Category active={voteCategory === 'PRO'}>
          Pro ({votes.pro.length})
        </Category>
        <Category active={voteCategory === 'NEUTRAL'}>
          Neutral ({votes.neutral.length})
        </Category>
        <Category active={voteCategory === 'REMARKS'}>
          Remarks ({votes.remarks.length})
        </Category>
        <Category active={voteCategory === 'CONCERNS'}>
          Concerns ({votes.concerns.length})
        </Category>
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

const Category = styled.li<{ active: boolean }>`
  border-bottom: ${({ active }) =>
    active ? 'solid 5px var(--c-secondary)' : 'unset'};
`

const VotesContainer = styled.ul``

const VoteDisplay = styled.li`
  list-style: none;
`
