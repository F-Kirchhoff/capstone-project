import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import DoubleChevronLeft from '../../Icons/DoubleChevronLeft'

type Votes = {
  pro: string[]
  neutral: string[]
  remarks: string[]
  concerns: string[]
}

export type Proposal = {
  id: string
  description: string
  votes: Votes
}

type ProposalViewProps = {
  content: Proposal
}

type CategoryNames = 'pro' | 'neutral' | 'remarks' | 'concerns'
const CATEGORIES: CategoryNames[] = ['pro', 'neutral', 'remarks', 'concerns']

export default function ProposalView({
  content,
}: ProposalViewProps): JSX.Element {
  const { description, votes } = content

  const [voteCategory, setVoteCategory] = useState<CategoryNames>('pro')
  const votesFromCategory: string[] =
    votes[voteCategory.toLowerCase() as keyof Votes]

  const VotesWithTextAvailable =
    votesFromCategory.filter((voteText: string) => voteText !== '').length > 0

  return (
    <ProposalViewContainer>
      <ReturnButton to="/">
        <DoubleChevronLeft width={'24'} />
      </ReturnButton>
      <h1>Proposal</h1>
      <p>{description}</p>
      <CategoryContainer>
        {CATEGORIES.map((category: CategoryNames) => (
          <Category
            active={voteCategory === category}
            onClick={() => setVoteCategory(category)}
          >
            {category.toLowerCase()} ({votes[category].length})
          </Category>
        ))}
      </CategoryContainer>
      {VotesWithTextAvailable ? (
        <VotesContainer>
          {votesFromCategory
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
  transition: 0.1s ease;
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