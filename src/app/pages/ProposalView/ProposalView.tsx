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

const CATEGORIES: VoteCategories[] = ['PRO', 'NEUTRAL', 'REMARKS', 'CONCERNS']

export default function ProposalView({ content }: ProposalViewProps) {
  const { description, votes } = content

  const [voteCategory, setVoteCategory] = useState<VoteCategories>('PRO')

  return (
    <ProposalViewContainer>
      <DoubleChevronLeft width={'24'} />
      <h1>Proposal</h1>
      <p>{description}</p>
      <CategoryContainer>
        {CATEGORIES.map((category: VoteCategories) => (
          <Category
            active={voteCategory === category}
            onClick={() => setVoteCategory(category)}
          >
            {category.toLowerCase()} ({votes[category.toLowerCase()].length})
          </Category>
        ))}
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

const CategoryContainer = styled.div`
  display: flex;
`

const Category = styled.button<{ active: boolean }>`
  flex-grow: 1;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  border: none;
  background-color: transparent;
  transition: 0.5s ease;
  border-bottom: ${({ active }) =>
    active ? 'solid 5px var(--c-secondary)' : 'solid 5px transparent'};
`

const VotesContainer = styled.ul``

const VoteDisplay = styled.li`
  list-style: none;
`
