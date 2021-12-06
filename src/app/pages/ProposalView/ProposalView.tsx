import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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

  const VotesWithTextAvailable =
    votes[voteCategory.toLowerCase()].filter(
      (voteText: string) => voteText !== ''
    ).length > 0

  return (
    <ProposalViewContainer>
      <ReturnButton to="/">
        <DoubleChevronLeft width={'24'} />
      </ReturnButton>
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
      {VotesWithTextAvailable ? (
        <VotesContainer>
          {votes[voteCategory.toLowerCase()]
            .filter((voteText: string) => voteText !== '')
            .map((voteText: string) => (
              <VoteDisplay>{voteText}</VoteDisplay>
            ))}
        </VotesContainer>
      ) : (
        <Disclaimer> No votes with comments in this category.</Disclaimer>
      )}
    </ProposalViewContainer>
  )
}

const ProposalViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
`

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
    active ? 'solid 3px var(--c-secondary)' : 'solid 3px transparent'};
`

const VotesContainer = styled.ul`
  display: grid;
  gap: 1px;
  background-color: var(--c-gray-400);
  border-radius: 3px;
  overflow: hidden;
`

const VoteDisplay = styled.li`
  list-style: none;
  padding: 10px 20px;
  background-color: var(--c-gray-100);
`
const Disclaimer = styled.p`
  color: var(--c-gray-400);
  text-align: center;
`

const ReturnButton = styled(Link)`
  color: inherit;
  text-decoration: none;
`
